'use client';
import {useEffect} from 'react';

const clamp=(v,min=0,max=1)=>Math.max(min,Math.min(max,v));
const DESKTOP_PATH='M 8 45 C 235 5 385 9 520 28 S 815 56 992 18';
const MOBILE_PATH='M 42 7 C 17 185 67 330 38 490 S 57 805 42 994';

/* Apenas atualizações visuais em requestAnimationFrame: não altera o scroll da página. */
export default function ScrollMotion(){
  useEffect(()=>{
    const root=document.querySelector('.epSite');
    if(!root||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    root.classList.add('motion-active');
    // Todos os navegadores no iPhone/iPad usam WebKit, que sofre com
    // sticky + transforms em superfícies grandes durante o touch-scroll.
    const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||
      (navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    root.classList.toggle('motion-ios',ios);
    const lowPower=ios||(navigator.deviceMemory>0&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=4);
    const setVar=(el,name,value)=>{if(el.style.getPropertyValue(name)!==value)el.style.setProperty(name,value)};
    const updateLite=()=>root.classList.toggle('motion-lite',lowPower||window.innerWidth<=480);
    updateLite();

    const selectors=[
      '.manifest .lead h2','.manifest .lead>p','.manifest .values article',
      '.journeyHead h2','.journeyHead>p','.stageGrid article',
      '.biCopy h2','.biCopy>p','.biArt',
      '.emotion h2','.emotion aside','.structureIntro h2','.structureIntro p',
      '.spaceList article','.integral h2','.routine article',
      '.enrollHead h2','.enrollCta','.contact h2',
      '.schoolTour__intro h2','.schoolTour__introSide','.tourStop__copy',
      '.tourGallery','.schoolTour__closing'
    ];
    const items=Array.from(root.querySelectorAll(selectors.join(',')));
    const pending=new Set();
    const observer=typeof IntersectionObserver==='function'
      ?new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(!entry.isIntersecting)return;
          entry.target.classList.remove('motion-pending');
          pending.delete(entry.target);
          observer.unobserve(entry.target);
        });
      },{threshold:0.01,rootMargin:'0px 0px 18% 0px'})
      :null;
    if(observer){
      items.forEach(el=>{
        const parent=el.parentElement;
        const stagger=parent&&parent.matches('.values,.stageGrid,.spaceList,.routine')
          ?Math.min(Array.from(parent.children).indexOf(el)*42,126):0;
        el.style.setProperty('--motion-delay',String(stagger)+'ms');
        el.classList.add('motion-reveal','motion-pending');
        pending.add(el);
        observer.observe(el);
      });
    }

    const photos=Array.from(root.querySelectorAll('.spaceList article'));
    const tourCards=Array.from(root.querySelectorAll('.schoolTour .tourStop'));
    const tourData=tourCards.map(card=>({card,photos:Array.from(card.querySelectorAll('.tourGallery__photo img'))}));
    // Safari recebe um reveal leve por observação; sem transformar a foto
    // a cada pixel de rolagem e sem depender de sticky em cards altos.
    let iosGalleryObserver=null;
    if(ios&&typeof IntersectionObserver==='function'){
      iosGalleryObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(!entry.isIntersecting)return;
          entry.target.classList.add('ios-gallery-visible');
          iosGalleryObserver.unobserve(entry.target);
        });
      },{threshold:.05,rootMargin:'0px 0px 10% 0px'});
      tourData.forEach(({photos})=>photos.forEach(img=>iosGalleryObserver.observe(img.parentElement)));
    }
    const coverSections=Array.from(root.children).filter(el=>el.matches('.campaignBanner,.manifest,.journey,.bilingual,.emotionWorld,.structure,.dailyRoutine,.enrollmentExplorer,.contact'));
    const stages=Array.from(root.querySelectorAll('.stageGrid .stage'));
    const hero=Array.from(root.querySelectorAll('.heroBoy,.heroGirl'));
    const values=root.querySelector('.manifest .values');
    const svg=values&&values.querySelector('.journeyTrace');
    const path=svg&&svg.querySelector('.journeyTrace__path');
    const cursor=svg&&svg.querySelector('.journeyTrace__cursor');
    let total=1;
    let frame=0;
    let lastFrameTime=0;
    let lastLayoutWidth=-1;
    const preparePath=()=>{
      if(!svg||!path)return;
      const mobile=window.innerWidth<=650;
      svg.setAttribute('viewBox',mobile?'0 0 80 1000':'0 0 1000 80');
      path.setAttribute('d',mobile?MOBILE_PATH:DESKTOP_PATH);
      try{
        total=Math.max(1,path.getTotalLength());
        path.style.strokeDasharray=String(total);
      }catch{
        total=1;
        if(cursor)cursor.style.display='none';
      }
    };
    const shiftPhoto=(el,amount,height)=>{
      const rect=el.getBoundingClientRect();
      if(rect.bottom < -140||rect.top>height+140)return;
      const distance=(rect.top+rect.height/2-height/2)/(height/2+rect.height/2);
      setVar(el,'--motion-photo-y',String((-clamp(distance,-1,1)*amount).toFixed(1))+'px');
    };
    const draw=()=>{
      frame=0;
      const height=window.innerHeight;
      const mobile=window.innerWidth<=700;
      // Fallback para observadores do Safari ao voltar da navegação/BFCache.
      // Se um conteúdo está na área visível, ele nunca permanece esmaecido.
      if(ios&&pending.size){
        for(const el of pending){
          const rect=el.getBoundingClientRect();
          if(rect.top<height*1.06&&rect.bottom>-32){
            el.classList.remove('motion-pending');
            pending.delete(el);
            if(observer)observer.unobserve(el);
          }
        }
      }
      // Telas menores mantêm o foguete e o reveal, sem recalcular parallax
      // de fotografias a cada rolagem (melhor fluidez e menos gasto de bateria).
      if(!mobile){
        const heroProgress=clamp(window.scrollY/600);
        hero.forEach((image,index)=>setVar(image,'--motion-photo-y',String((-heroProgress*(index?23:11)).toFixed(1))+'px'));
        stages.forEach(el=>shiftPhoto(el,15,height));
        photos.forEach(el=>shiftPhoto(el,19,height));
        if(photos[0]){
          const rect=photos[0].getBoundingClientRect();
          if(rect.bottom>-150&&rect.top<height+150){
            const enter=clamp((height*.92-rect.top)/(height*.62+rect.height*.52));
            setVar(photos[0],'--motion-facade-zoom',(1.18-enter*.12).toFixed(3));
          }
        }
      }
      // Entrada em camadas contínua e gradual em todas as telas.
      // Preparar a progressão também fora do viewport evita o salto repentino
      // da posição padrão para o início da animação quando a seção aparece.
      if(!ios){
      const sectionRects=coverSections.map(section=>({section,rect:section.getBoundingClientRect()}));
      const lift=mobile?13:window.innerWidth<=950?17:20;
      sectionRects.forEach(({section,rect})=>{
        const progress=clamp((height*.96-rect.top)/(height*.54));
        const eased=progress*progress*(3-2*progress);
        setVar(section,'--stack-enter',eased.toFixed(3));
        setVar(section,'--stack-lift-y',((1-eased)*lift).toFixed(1)+'px');
        setVar(section,'--stack-opacity',(.93+eased*.07).toFixed(3));
      });
      }
      // O passeio acompanha o dedo no celular; cards fora da tela
      // conservam a última posição sem comprometer a fluidez.
      if(window.innerWidth<=950&&!ios){
        const tourRects=tourData.map(({card,photos})=>({card,photos,rect:card.getBoundingClientRect()}));
        tourRects.forEach(({card,photos,rect})=>{
          if(rect.bottom<-120||rect.top>height+140)return;
          const progress=clamp((height*.9-rect.top)/(height*.48+Math.min(rect.height,height)*.48));
          setVar(card,'--tour-progress',progress.toFixed(3));
          photos.forEach((photo,index)=>{
            setVar(photo,'--tour-photo-y',((.5-progress)*(index%2===0?-18:18)).toFixed(1)+'px');
            setVar(photo,'--tour-photo-scale',(1.105-progress*.055).toFixed(3));
          });
        });
      }
      if(values&&path&&cursor){
        const rect=values.getBoundingClientRect();
        if(rect.bottom>-100&&rect.top<height+150){
          const progress=clamp((height*.83-rect.top)/(height*.48+rect.height*.66));
          const dashOffset=String(total*(1-progress));
          if(path.style.strokeDashoffset!==dashOffset)path.style.strokeDashoffset=dashOffset;
          try{
            const point=path.getPointAtLength(total*progress);
            const transform='translate('+point.x.toFixed(1)+' '+point.y.toFixed(1)+')';
            if(cursor.getAttribute('transform')!==transform)cursor.setAttribute('transform',transform);
          }catch{
            cursor.style.display='none';
          }
        }
      }
    };
    const tick=(time)=>{
      const interval=ios?33:window.innerWidth<=700?(lowPower||window.innerWidth<=420?33:24):16;
      if(time-lastFrameTime<interval){frame=window.requestAnimationFrame(tick);return}
      lastFrameTime=time;
      draw();
    };
    const schedule=()=>{
      if(document.visibilityState==='hidden')return;
      if(!frame)frame=window.requestAnimationFrame(tick);
    };
    const onResize=()=>{
      const width=window.innerWidth;
      const compact=width<=950;
      // Barras do navegador móvel mudam a altura ao rolar. Não alternar
      // sticky nessas mudanças, pois isso provoca saltos visíveis.
      if(Math.abs(width-lastLayoutWidth)>2){
        lastLayoutWidth=width;
        updateLite();
        preparePath();
        const usableHeight=window.innerHeight-98;
        const banner=root.querySelector('.campaignBanner');
        if(banner)banner.classList.toggle('campaignBanner--sticky',compact&&!ios&&window.innerHeight>=640&&banner.offsetHeight<=usableHeight);
        tourCards.forEach(card=>{
          card.classList.toggle('tourStop--sticky',compact&&!ios&&window.innerHeight>=620&&card.offsetHeight<=usableHeight);
          if(!compact){
            card.style.removeProperty('--tour-progress');
            card.querySelectorAll('.tourGallery__photo img').forEach(img=>{
              img.style.removeProperty('--tour-photo-y');
              img.style.removeProperty('--tour-photo-scale');
            });
          }
        });
      }
      if(window.innerWidth<=700){
        [...hero,...stages,...photos].forEach(el=>el.style.removeProperty('--motion-photo-y'));
        if(photos[0])photos[0].style.removeProperty('--motion-facade-zoom');
      }
      schedule();
    };
    onResize();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',onResize,{passive:true});
    document.addEventListener('visibilitychange',schedule);
    // O Safari restaura páginas do cache sem disparar resize.
    window.addEventListener('pageshow',onResize,{passive:true});
    schedule();

    return ()=>{
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',onResize);
      document.removeEventListener('visibilitychange',schedule);
      window.removeEventListener('pageshow',onResize);
      if(iosGalleryObserver)iosGalleryObserver.disconnect();
      if(frame)window.cancelAnimationFrame(frame);
      if(observer)observer.disconnect();
      items.forEach(el=>el.classList.remove('motion-reveal','motion-pending'));
      root.classList.remove('motion-active','motion-lite','motion-ios');
    };
  },[]);
  return null;
}

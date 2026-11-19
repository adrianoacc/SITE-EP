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

    const selectors=[
      '.manifest .lead h2','.manifest .lead>p','.manifest .values article',
      '.journeyHead h2','.journeyHead>p','.stageGrid article',
      '.biCopy h2','.biCopy>p','.biArt',
      '.emotion h2','.emotion aside','.structureIntro h2','.structureIntro p',
      '.spaceList article','.integral h2','.routine article',
      '.enrollHead h2','.enrollCta','.contact h2'
    ];
    const items=Array.from(root.querySelectorAll(selectors.join(',')));
    const observer=typeof IntersectionObserver==='function'
      ?new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(!entry.isIntersecting)return;
          entry.target.classList.remove('motion-pending');
          observer.unobserve(entry.target);
        });
      },{threshold:0.12,rootMargin:'0px 0px -5% 0px'})
      :null;
    if(observer){
      items.forEach(el=>{
        const parent=el.parentElement;
        const stagger=parent&&parent.matches('.values,.stageGrid,.spaceList,.routine')
          ?Math.min(Array.from(parent.children).indexOf(el)*65,260):0;
        el.style.setProperty('--motion-delay',String(stagger)+'ms');
        el.classList.add('motion-reveal','motion-pending');
        observer.observe(el);
      });
    }

    const photos=Array.from(root.querySelectorAll('.spaceList article'));
    const tourCards=Array.from(root.querySelectorAll('.schoolTour .tourStop'));
    const coverSections=Array.from(root.children).filter(el=>el.matches('.campaignBanner,.manifest,.journey,.bilingual,.emotionWorld,.structure,.dailyRoutine,.enrollmentExplorer,.contact'));
    const stages=Array.from(root.querySelectorAll('.stageGrid .stage'));
    const hero=Array.from(root.querySelectorAll('.heroBoy,.heroGirl'));
    const values=root.querySelector('.manifest .values');
    const svg=values&&values.querySelector('.journeyTrace');
    const path=svg&&svg.querySelector('.journeyTrace__path');
    const cursor=svg&&svg.querySelector('.journeyTrace__cursor');
    let total=1;
    let frame=0;
    const preparePath=()=>{
      if(!svg||!path)return;
      const mobile=window.innerWidth<=650;
      svg.setAttribute('viewBox',mobile?'0 0 80 1000':'0 0 1000 80');
      path.setAttribute('d',mobile?MOBILE_PATH:DESKTOP_PATH);
      total=Math.max(1,path.getTotalLength());
      path.style.strokeDasharray=String(total);
    };
    const shiftPhoto=(el,amount,height)=>{
      const rect=el.getBoundingClientRect();
      if(rect.bottom < -140||rect.top>height+140)return;
      const distance=(rect.top+rect.height/2-height/2)/(height/2+rect.height/2);
      el.style.setProperty('--motion-photo-y',String((-clamp(distance,-1,1)*amount).toFixed(1))+'px');
    };
    const draw=()=>{
      frame=0;
      const height=window.innerHeight;
      const mobile=window.innerWidth<=700;
      // Telas menores mantêm o foguete e o reveal, sem recalcular parallax
      // de fotografias a cada rolagem (melhor fluidez e menos gasto de bateria).
      if(!mobile){
        const heroProgress=clamp(window.scrollY/600);
        hero.forEach((image,index)=>image.style.setProperty('--motion-photo-y',String((-heroProgress*(index?23:11)).toFixed(1))+'px'));
        stages.forEach(el=>shiftPhoto(el,15,height));
        photos.forEach(el=>shiftPhoto(el,19,height));
        if(photos[0]){
          const rect=photos[0].getBoundingClientRect();
          if(rect.bottom>-150&&rect.top<height+150){
            const enter=clamp((height*.92-rect.top)/(height*.62+rect.height*.52));
            photos[0].style.setProperty('--motion-facade-zoom',(1.18-enter*.12).toFixed(3));
          }
        }
      }
      // No celular e tablet, as fotos do passeio respondem à rolagem mesmo sem hover.
      // O movimento fica limitado às cenas próximas da tela.
      if(window.innerWidth<=950){
        coverSections.forEach(section=>{
          const rect=section.getBoundingClientRect();
          if(rect.bottom<-90||rect.top>height+100)return;
          const entry=clamp((height*.95-rect.top)/(height*.42));
          section.style.setProperty('--stack-enter',entry.toFixed(3));
        });
        tourCards.forEach(card=>{
          const rect=card.getBoundingClientRect();
          if(rect.bottom<-120||rect.top>height+140)return;
          const progress=clamp((height*.9-rect.top)/(height*.48+Math.min(rect.height,height)*.48));
          card.style.setProperty('--tour-progress',progress.toFixed(3));
          card.querySelectorAll('.tourGallery__photo img').forEach((photo,index)=>{
            photo.style.setProperty('--tour-photo-y',((.5-progress)*(index%2===0?-18:18)).toFixed(1)+'px');
            photo.style.setProperty('--tour-photo-scale',(1.105-progress*.055).toFixed(3));
          });
        });
      }
      if(values&&path&&cursor){
        const rect=values.getBoundingClientRect();
        if(rect.bottom>-100&&rect.top<height+150){
          const progress=clamp((height*.83-rect.top)/(height*.48+rect.height*.66));
          path.style.strokeDashoffset=String(total*(1-progress));
          const point=path.getPointAtLength(total*progress);
          cursor.setAttribute('transform','translate('+point.x.toFixed(1)+' '+point.y.toFixed(1)+')');
        }
      }
    };
    const schedule=()=>{if(!frame)frame=window.requestAnimationFrame(draw)};
    const onResize=()=>{
      const compact=window.innerWidth<=950;
      const usableHeight=window.innerHeight-98;
      tourCards.forEach(card=>{
        // Sticky somente se a cena inteira couber na tela; caso contrário,
        // a rolagem continua livre e a próxima cena cobre a borda anterior.
        card.classList.toggle('tourStop--sticky',compact&&window.innerHeight>=620&&card.offsetHeight<=usableHeight);
        if(!compact){
          card.style.removeProperty('--tour-progress');
          card.querySelectorAll('.tourGallery__photo img').forEach(img=>{
            img.style.removeProperty('--tour-photo-y');
            img.style.removeProperty('--tour-photo-scale');
          });
        }
      });
      if(!compact)coverSections.forEach(el=>el.style.removeProperty('--stack-enter'));
      if(window.innerWidth<=700){
        [...hero,...stages,...photos].forEach(el=>el.style.removeProperty('--motion-photo-y'));
        if(photos[0])photos[0].style.removeProperty('--motion-facade-zoom');
      }
      preparePath();schedule();
    };
    onResize();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',onResize,{passive:true});
    schedule();

    return ()=>{
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',onResize);
      if(frame)window.cancelAnimationFrame(frame);
      if(observer)observer.disconnect();
      items.forEach(el=>el.classList.remove('motion-reveal','motion-pending'));
      root.classList.remove('motion-active');
    };
  },[]);
  return null;
}

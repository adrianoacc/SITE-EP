'use client';
import {useState} from 'react';

const benefits=[
 ['01','Programa Bilíngue','Inglês presente na rotina, com experiências que ampliam repertório e confiança.'],
 ['02','Integral & Semi-integral','Uma rotina completa para a criança e mais tranquilidade para a família.'],
 ['03','Maternal ao 5º ano','Uma jornada contínua que acompanha cada etapa do desenvolvimento.'],
 ['04','Estrutura completa','Salas climatizadas, biblioteca, quadra e dois parquinhos estruturados.']
];

function Logo(){return <div className="logo"><div className="logoMark"><i/><i/><i/><i/><i/><b/><b/></div><div className="logoWords"><strong>ESCOLA PARQUE</strong><small>Educação Infantil e Ensino Fundamental</small></div></div>}

export default function Home(){
 const [open,setOpen]=useState(false);
 return <main>
  <header className="topbar">
   <a href="#inicio" aria-label="Escola Parque"><Logo/></a>
   <button className="menuBtn" onClick={()=>setOpen(!open)} aria-label="Abrir menu"><span/><span/></button>
   <nav className={open?'open':''}>
    <a href="#escola">A Escola</a><a href="#ensino">Ensino</a><a href="#bilingue">Bilíngue</a><a href="#estrutura">Estrutura</a>
    <a className="pill" href="#contato">Agendar visita <span>↗</span></a>
   </nav>
  </header>

  <section id="inicio" className="hero">
   <div className="grain"/><div className="heroGlow"/>
   <div className="heroCopy">
    <div className="kicker"><span/> EDUCAÇÃO PARA O PRESENTE E PARA O FUTURO</div>
    <h1>Onde a infância<br/>ganha <em>espaço</em><br/>para florescer.</h1>
    <p>Uma escola acolhedora, contemporânea e completa. Do Maternal ao 5º ano, cada descoberta vira parte de uma grande história.</p>
    <div className="heroActions"><a className="btnMain" href="#contato">Agende uma visita <span>↗</span></a><a className="textLink" href="#escola">Descubra a Escola <span>↓</span></a></div>
   </div>
   <div className="heroArt" aria-hidden="true">
    <div className="arch"><div className="archInner"><div className="bigLeaf">✦</div><p>APRENDER<br/><b>É DESCOBRIR</b></p></div></div>
    <div className="orbit orbit1">BILÍNGUE</div><div className="orbit orbit2">MATERNAL → 5º ANO</div>
    <div className="scribble">∞</div>
   </div>
   <div className="scrollNote">SCROLL TO EXPLORE <span>↓</span></div>
  </section>

  <section className="marquee"><div>APRENDER <b>✦</b> CRESCER <b>✦</b> DESCOBRIR <b>✦</b> CRIAR <b>✦</b> CONVIVER <b>✦</b> APRENDER <b>✦</b> CRESCER <b>✦</b></div></section>

  <section id="escola" className="manifesto">
   <div className="sectionNo">01 / A ESCOLA</div>
   <div className="manifestoTitle"><span>Mais que uma escola.</span><h2>Um lugar onde cada criança pode ser <em>inteira.</em></h2></div>
   <div className="manifestoText"><p>Na Escola Parque, aprender não acontece só entre quatro paredes. Acontece na leitura, no movimento, nas brincadeiras, nas relações e em cada nova pergunta.</p><a href="#ensino">Conheça nossa proposta <span>↗</span></a></div>
  </section>

  <section className="benefits">
   {benefits.map((b,i)=><article key={b[0]}><div className="benefitTop"><span>{b[0]}</span><i>↗</i></div><h3>{b[1]}</h3><p>{b[2]}</p><div className="line"/></article>)}
  </section>

  <section id="bilingue" className="bilingual">
   <div className="bilingualArt"><div className="hello">HELLO!</div><div className="world">WORLD<br/>IS YOURS.</div><div className="roundText">ENGLISH • EVERY DAY • ENGLISH • EVERY DAY •</div></div>
   <div className="bilingualCopy"><div className="sectionNo light">02 / PROGRAMA BILÍNGUE</div><h2>Inglês que sai do livro e <em>entra na vida.</em></h2><p>O contato com o inglês acontece de maneira contextualizada e natural. A criança aprende enquanto interage, brinca, cria e se comunica.</p><div className="tags"><span>Vivência diária</span><span>Comunicação</span><span>Novas culturas</span></div><a className="btnLight" href="#contato">Conhecer o programa <span>↗</span></a></div>
  </section>

  <section id="ensino" className="journey">
   <div className="journeyHead"><div className="sectionNo">03 / JORNADA DE ENSINO</div><h2>Do primeiro passo<br/>às <em>grandes ideias.</em></h2><p>Uma formação que respeita o tempo da infância e evolui junto com cada aluno.</p></div>
   <div className="journeyCards">
    <article className="stage stageA"><span>MATERNAL</span><div><small>DESCOBRIR</small><h3>Educação<br/>Infantil</h3><p>Afeto, brincadeira e experiências que despertam curiosidade e autonomia.</p></div><b>01</b></article>
    <article className="stage stageB"><span>1º AO 5º ANO</span><div><small>EVOLUIR</small><h3>Ensino<br/>Fundamental</h3><p>Conhecimento, protagonismo e habilidades para seguir aprendendo com confiança.</p></div><b>02</b></article>
   </div>
  </section>

  <section id="estrutura" className="spaces">
   <div className="spacesIntro"><div className="sectionNo light">04 / NOSSOS ESPAÇOS</div><h2>Uma escola feita para <em>ser vivida.</em></h2><p>Cada ambiente participa da aprendizagem. Aqui, conforto, movimento, leitura e diversão fazem parte da rotina.</p></div>
   <div className="spaceGrid"><div className="space big"><span>01</span><b>2 PARQUINHOS</b><small>BRINCAR • CRIAR • CONVIVER</small></div><div className="space green"><span>02</span><b>QUADRA ESPORTIVA</b><small>MOVIMENTO • ESPORTE</small></div><div className="space lime"><span>03</span><b>BIBLIOTECA</b><small>LER • IMAGINAR • DESCOBRIR</small></div><div className="space dark"><span>04</span><b>SALAS CLIMATIZADAS</b><small>CONFORTO • APRENDIZAGEM</small></div></div>
  </section>

  <section className="fulltime"><div className="sectionNo">05 / MAIS TEMPO, MAIS EXPERIÊNCIAS</div><div className="fulltimeMain"><h2>Integral ou<br/><em>semi-integral.</em></h2><div><p>Uma rotina pensada para quem precisa de flexibilidade sem abrir mão de cuidado, desenvolvimento e experiências de qualidade.</p><div className="routine"><span>ACOLHER</span><i>→</i><span>APRENDER</span><i>→</i><span>BRINCAR</span><i>→</i><span>CRESCER</span></div></div></div></section>

  <section id="contato" className="contact">
   <div className="contactStar">✦</div><div className="kicker centerK">VENHA VIVER A ESCOLA PARQUE</div><h2>O futuro começa<br/><em>com uma visita.</em></h2><p>Conheça nossa proposta, nossos espaços e descubra por que a Escola Parque pode ser o próximo grande capítulo da história do seu filho.</p><a href="#">Quero agendar uma visita <span>↗</span></a>
  </section>

  <footer><Logo/><div className="footerText"><p>Maternal ao 5º ano<br/>Programa Bilíngue<br/>Integral e Semi-integral</p></div><div className="footerEnd"><span>© 2026 ESCOLA PARQUE</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></footer>
 </main>
}
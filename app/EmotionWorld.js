'use client';

import {useEffect, useRef, useState} from 'react';

const discoveries = [
  {
    key: 'conhecer',
    name: 'Autoconhecimento',
    action: 'Dar nome ao que sinto',
    symbol: '☀',
    color: 'yellow',
    headline: 'Quando uma emoção ganha nome, fica mais fácil conversar.',
    description: 'A criança aprende, aos poucos, a reconhecer o que sente e a pedir ajuda quando precisa. Um passo importante para conhecer a si mesma.',
    example: '“Hoje eu fiquei triste.”'
  },
  {
    key: 'acolher',
    name: 'Empatia',
    action: 'Olhar para o outro',
    symbol: '♡',
    color: 'pink',
    headline: 'Perceber o outro também se aprende.',
    description: 'Nas relações do dia a dia, incentivamos escuta, respeito e atenção aos sentimentos dos colegas. Conviver é descobrir que cada pessoa sente de um jeito.',
    example: '“Acho que meu amigo precisa de ajuda.”'
  },
  {
    key: 'recomecar',
    name: 'Resiliência',
    action: 'Tentar outra vez',
    symbol: '✳',
    color: 'lime',
    headline: 'Nem tudo dá certo de primeira — e tudo bem.',
    description: 'Uma brincadeira difícil ou um desafio novo pode ensinar a lidar com frustrações, buscar alternativas e recomeçar com confiança.',
    example: '“Não consegui ainda. Vou tentar de novo.”'
  },
  {
    key: 'expressar',
    name: 'Gestão das emoções',
    action: 'Encontrar meu jeito',
    symbol: '☺',
    color: 'blue',
    headline: 'Sentir é natural. Aprender a expressar faz diferença.',
    description: 'Com acolhimento e orientação, a criança encontra maneiras mais saudáveis de expressar emoções, conversar sobre conflitos e enfrentar desafios.',
    example: '“Estou bravo. Preciso me acalmar.”'
  }
];

export default function EmotionWorld() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const current = discoveries[active];

  useEffect(() => {
    const section = sectionRef.current;
    const trail = section?.querySelector('.emotionWorld__trail');
    if (!section || !trail) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const updateTrail = () => {
      frame = 0;
      if (reduceMotion) {
        trail.style.setProperty('--emotion-trail-progress', '1');
        return;
      }
      const rect = trail.getBoundingClientRect();
      const start = window.innerHeight * .8;
      const distance = Math.max(1, rect.height + window.innerHeight * .28);
      const progress = Math.max(0, Math.min(1, (start - rect.top) / distance));
      trail.style.setProperty('--emotion-trail-progress', progress.toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTrail);
    };

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('emotionWorld--revealed');
          observer.unobserve(entry.target);
        });
      }, {threshold: .12});
      observer.observe(section);
      observer.observe(trail);
    } else {
      section.classList.add('emotionWorld--revealed');
      trail.classList.add('emotionWorld--revealed');
    }

    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <section id="emocoes" className="emotionWorld" ref={sectionRef} aria-labelledby="emotionWorldTitle">
      <div className="emotionWorld__hero">
        <div className="emotionWorld__copy">
          <span className="emotionWorld__eyebrow"><span aria-hidden="true">✳</span> OFICINA DAS EMOÇÕES</span>
          <h2 id="emotionWorldTitle">Sentir faz parte. <em>Aprender a lidar com o que sentimos também.</em></h2>
          <p>Na Oficina das Emoções, ajudamos as crianças a reconhecer sentimentos, conversar sobre o que vivem e encontrar caminhos para enfrentar os desafios da infância.</p>
          <div className="emotionWorld__invite"><span className="emotionWorld__inviteDot" aria-hidden="true"/><span>Conheça o universo das emoções logo abaixo</span></div>
        </div>

        <div className="emotionWorld__stage" aria-label="Personagens da Oficina das Emoções da Escola Parque">
          <span className="emotionWorld__orbit emotionWorld__orbit--one" aria-hidden="true"/>
          <span className="emotionWorld__orbit emotionWorld__orbit--two" aria-hidden="true"/>
          <span className="emotionWorld__star emotionWorld__star--one" aria-hidden="true">✳</span>
          <span className="emotionWorld__star emotionWorld__star--two" aria-hidden="true">✦</span>
          <img className="emotionWorld__logo" src="/Oficina das Emoções Colorida.png" alt="Oficina das Emoções" loading="lazy" decoding="async"/>
          <img className="emotionWorld__friends" src="/turma-socioemocional.png" alt="Personagens coloridos da Oficina das Emoções" loading="lazy" decoding="async"/>
          {discoveries.map((discovery, index) => (
            <button
              key={discovery.key}
              type="button"
              className={'emotionWorld__bubble emotionWorld__bubble--' + discovery.color + (active === index ? ' is-active' : '')}
              onClick={() => setActive(index)}
              aria-label={'Descobrir sobre ' + discovery.name}
              aria-pressed={active === index}
              aria-controls="emotionWorldDetail"
            >
              <span aria-hidden="true">{discovery.symbol}</span>{discovery.action}
            </button>
          ))}
        </div>
      </div>

      <div className="emotionWorld__experience">
        <div className="emotionWorld__experienceHead">
          <div>
            <span className="emotionWorld__eyebrowSmall">APRENDER A SENTIR, TODOS OS DIAS</span>
            <h3>Uma descoberta de cada vez.</h3>
          </div>
          <p>Escolha um tema e veja como o desenvolvimento emocional pode fazer parte das pequenas situações da infância.</p>
        </div>

        <div className="emotionWorld__trail" role="group" aria-label="Explore os quatro temas da Oficina das Emoções">
          {discoveries.map((discovery, index) => (
            <button
              key={discovery.key}
              className={'emotionWorld__step emotionWorld__step--' + discovery.color + (active === index ? ' is-active' : '')}
              type="button"
              aria-controls="emotionWorldDetail"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span className="emotionWorld__stepSymbol" aria-hidden="true">{discovery.symbol}</span>
              <span className="emotionWorld__stepName">{discovery.name}</span>
              <span className="emotionWorld__stepPrompt">{discovery.action}</span>
            </button>
          ))}
        </div>

        <div className={'emotionWorld__detail emotionWorld__detail--' + current.color} id="emotionWorldDetail" aria-live="polite" aria-atomic="true">
          <span className="emotionWorld__detailIcon" aria-hidden="true">{current.symbol}</span>
          <div className="emotionWorld__detailCopy">
            <span>NA PRÁTICA · {current.name.toUpperCase()}</span>
            <h4>{current.headline}</h4>
            <p>{current.description}</p>
            <blockquote>{current.example}</blockquote>
          </div>
        </div>
      </div>

      <div className="emotionWorld__footer">
        <p>Porque cuidar da infância também é acolher tudo o que ela sente.</p>
        <a href="https://wa.me/5591993371903?text=Ol%C3%A1%21%20Quero%20conhecer%20a%20Oficina%20das%20Emo%C3%A7%C3%B5es%20da%20Escola%20Parque.">Quero conhecer a Oficina</a>
      </div>
    </section>
  );
}

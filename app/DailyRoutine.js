'use client';

import {useEffect, useRef, useState} from 'react';

const schedules = {
  semi: {
    name: 'Semi-integral',
    time: '07h30 — 14h',
    end: '14h',
    summary: 'Aula regular pela manhã, banho e almoço antes de voltar para casa.',
    steps: [
      {icon: '☀', title: 'Chegada', detail: 'O dia começa na Escola Parque.', time: '07h30'},
      {icon: '✎', title: 'Aulas da manhã', detail: 'Aula regular com a turma.'},
      {icon: '♡', title: 'Banho e almoço', detail: 'Cuidado e refeição após as aulas.'},
      {icon: '⌂', title: 'Volta para casa', detail: 'Fim da rotina semi-integral.', time: '14h'}
    ]
  },
  integral: {
    name: 'Integral',
    time: '07h30 — 17h30',
    end: '17h30',
    summary: 'Além das aulas, a tarde inclui acompanhamento escolar, Circuito Kids e reforço de inglês.',
    steps: [
      {icon: '☀', title: 'Chegada', detail: 'O dia começa na Escola Parque.', time: '07h30'},
      {icon: '✎', title: 'Aulas da manhã', detail: 'Aula regular com a turma.'},
      {icon: '♡', title: 'Banho e almoço', detail: 'Cuidados e refeição para continuar o dia.'},
      {icon: '✳', title: 'Tarde com atividades', detail: 'Acompanhamento escolar, Circuito Kids e reforço de inglês.'},
      {icon: '⌂', title: 'Volta para casa', detail: 'Fim da rotina integral.', time: '17h30'}
    ]
  }
};

export default function DailyRoutine() {
  const [mode, setMode] = useState('integral');
  const sectionRef = useRef(null);
  const current = schedules[mode];

  useEffect(() => {
    const section = sectionRef.current;
    const path = section?.querySelector('.dailyRoutine__path');
    if (!section || !path) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const draw = () => {
      frame = 0;
      if (reducedMotion) {
        path.style.setProperty('--routine-progress', '1');
        return;
      }
      const rect = path.getBoundingClientRect();
      const start = window.innerHeight * .83;
      const travel = Math.max(1,rect.height + window.innerHeight * .16);
      const progress = Math.max(0,Math.min(1,(start - rect.top) / travel));
      path.style.setProperty('--routine-progress',progress.toFixed(3));
    };
    const schedule = () => {if (!frame) frame = window.requestAnimationFrame(draw);};

    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('dailyRoutine--revealed');
          observer.unobserve(entry.target);
        });
      },{threshold:.12});
      observer.observe(section);
      observer.observe(path);
    } else {
      section.classList.add('dailyRoutine--revealed');
      path.classList.add('dailyRoutine--revealed');
    }

    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <section className="dailyRoutine" id="integral" ref={sectionRef} aria-labelledby="dailyRoutineTitle">
      <div className="dailyRoutine__top">
        <div className="dailyRoutine__intro">
          <span className="dailyRoutine__eyebrow"><span aria-hidden="true">✳</span> INTEGRAL E SEMI-INTEGRAL</span>
          <h2 id="dailyRoutineTitle">Mais tempo na escola. <em>Mais momentos para viver a infância.</em></h2>
          <p>Do turno da manhã ao fim da tarde, você escolhe a rotina que combina com sua família. Veja o que acontece em cada modalidade.</p>
        </div>
        <div className="dailyRoutine__selector">
          <span className="dailyRoutine__selectorLabel">QUAL ROTINA COMBINA COM VOCÊS?</span>
          <div className="dailyRoutine__options" role="group" aria-label="Selecione a modalidade">
            <button type="button" onClick={() => setMode('semi')} aria-pressed={mode === 'semi'} aria-controls="dailyRoutineJourney" className={mode === 'semi' ? 'is-active' : ''}>Semi-integral</button>
            <button type="button" onClick={() => setMode('integral')} aria-pressed={mode === 'integral'} aria-controls="dailyRoutineJourney" className={mode === 'integral' ? 'is-active' : ''}>Integral</button>
          </div>
          <div className="dailyRoutine__time">
            <span>ENTRADA <strong>07h30</strong></span>
            <span className="dailyRoutine__timeLine" aria-hidden="true"><i/></span>
            <span>SAÍDA <strong>{current.end}</strong></span>
          </div>
          <p className="dailyRoutine__selectorSummary">{current.summary}</p>
        </div>
      </div>

      <div className="dailyRoutine__journey" id="dailyRoutineJourney">
        <div className="dailyRoutine__journeyHead">
          <div>
            <span>UM DIA NA ESCOLA PARQUE</span>
            <h3>Do primeiro bom-dia à hora de voltar para casa.</h3>
          </div>
          <p>Os momentos seguem a rotina escolhida. A linha acompanha a sua rolagem pela página.</p>
        </div>

        <div className="dailyRoutine__path" style={{'--routine-count': current.steps.length}}>
          <div className="dailyRoutine__pathLine" aria-hidden="true"><span className="dailyRoutine__pathFill"/><span className="dailyRoutine__backpack"><i className="dailyRoutine__backpackHandle"/><i className="dailyRoutine__backpackPocket"/></span></div>
          <ol className="dailyRoutine__steps" key={mode}>
            {current.steps.map((step,index) => (
              <li className="dailyRoutine__step" key={step.title}>
                <span className="dailyRoutine__stepIcon" aria-hidden="true">{step.icon}</span>
                {step.time && <span className="dailyRoutine__stepTime">{step.time}</span>}
                <h4>{step.title}</h4>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        {mode === 'integral' && (
          <p className="dailyRoutine__extra"><span aria-hidden="true">✦</span> Judô e ballet estão disponíveis como atividades adicionais.</p>
        )}
      </div>

      <div className="dailyRoutine__footer">
        <div><span>ANO LETIVO 2027</span><p>Seu filho tem uma rotina. Sua família tem tranquilidade para escolher.</p></div>
        <a href="https://wa.me/5591993371903?text=Ol%C3%A1%21%20Quero%20conhecer%20o%20Integral%20e%20Semi-integral%20da%20Escola%20Parque%20para%202027.">Conhecer as opções para 2027</a>
      </div>
    </section>
  );
}

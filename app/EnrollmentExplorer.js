'use client';

import {useState} from 'react';

const groups = {
  infantil: {
    name: 'Educação Infantil',
    detail: 'Dos 2 aos 5 anos',
    short: 'Acolhimento, brincadeira e descobertas em cada fase.',
    classes: [
      {name:'Maternal I', age:'2 anos', description:'Primeiros vínculos, brincadeiras e descobertas em uma rotina de acolhimento.'},
      {name:'Maternal II', age:'3 anos', description:'Um dia a dia cheio de experiências para explorar, conviver e ganhar autonomia.'},
      {name:'Jardim I', age:'4 anos', description:'Novas perguntas, histórias e vivências que despertam a curiosidade.'},
      {name:'Jardim II', age:'5 anos', description:'Mais autonomia e novas conquistas para viver essa etapa com confiança.'}
    ]
  },
  fundamental: {
    name: 'Ensino Fundamental',
    detail: 'Do 1º ao 5º ano',
    short: 'Conhecimento, autonomia e desafios que crescem com a criança.',
    classes: [
      {name:'1º ano', age:'Anos iniciais', description:'Uma nova fase de aprendizagem, com atenção ao ritmo de cada aluno.'},
      {name:'2º ano', age:'Anos iniciais', description:'Descobertas e desafios para ampliar conhecimentos e confiança.'},
      {name:'3º ano', age:'Anos iniciais', description:'Mais perguntas, projetos e oportunidades de aprender junto.'},
      {name:'4º ano', age:'Anos iniciais', description:'Um caminho de novas responsabilidades e conhecimentos.'},
      {name:'5º ano', age:'Anos iniciais', description:'Mais autonomia para avançar nos estudos e se preparar para novas etapas.'}
    ]
  }
};

export default function EnrollmentExplorer() {
  const [stage, setStage] = useState('infantil');
  const [selected, setSelected] = useState(0);
  const current = groups[stage];
  const turma = current.classes[selected];
  const message = 'Olá! Gostaria de agendar uma visita à Escola Parque e conhecer a turma ' + turma.name + ' (' + current.name + ') para o ano letivo de 2027. Podemos conversar?';
  const whatsapp = 'https://wa.me/5591993371903?text=' + encodeURIComponent(message);

  const chooseStage = next => {
    if (next === stage) return;
    setStage(next);
    setSelected(0);
  };

  return (
    <section id="matriculas" className="enrollmentExplorer" aria-labelledby="enrollmentExplorerTitle">
      <span className="enrollmentExplorer__orb enrollmentExplorer__orb--one" aria-hidden="true"/>
      <span className="enrollmentExplorer__orb enrollmentExplorer__orb--two" aria-hidden="true"/>
      <div className="enrollmentExplorer__inner">
        <div className="enrollmentExplorer__intro">
          <div>
            <span className="enrollmentExplorer__eyebrow"><span aria-hidden="true">✳</span> MATRÍCULAS ABERTAS 2027</span>
            <h2 id="enrollmentExplorerTitle">Cada fase tem seu tempo.<br/><em>Vamos descobrir a turma do seu filho?</em></h2>
          </div>
          <p>É simples: escolha a etapa, encontre a turma e converse com a nossa equipe. A melhor maneira de decidir é conhecer a escola de perto.</p>
        </div>

        <div className="enrollmentExplorer__grid">
          <div className="enrollmentExplorer__chooser">
            <div className="enrollmentExplorer__chooserHead">
              <div>
                <span className="enrollmentExplorer__miniLabel">COMECE POR AQUI</span>
                <h3>Em qual etapa seu filho está?</h3>
              </div>
              <span className="enrollmentExplorer__asterisk" aria-hidden="true">✿</span>
            </div>
            <div className="enrollmentExplorer__stages" role="group" aria-label="Etapa de ensino">
              <button type="button" className={stage === 'infantil' ? 'is-active' : ''} aria-pressed={stage === 'infantil'} onClick={() => chooseStage('infantil')}>
                <span aria-hidden="true">☀</span> Educação Infantil
              </button>
              <button type="button" className={stage === 'fundamental' ? 'is-active' : ''} aria-pressed={stage === 'fundamental'} onClick={() => chooseStage('fundamental')}>
                <span aria-hidden="true">✎</span> Ensino Fundamental
              </button>
            </div>
            <div className="enrollmentExplorer__classHead">
              <span>ESCOLHA A TURMA</span>
              <span>{current.detail}</span>
            </div>
            <div className="enrollmentExplorer__classes" role="group" aria-label={'Turmas de ' + current.name} key={stage}>
              {current.classes.map((item, index) => (
                <button type="button" key={item.name} onClick={() => setSelected(index)}
                  className={selected === index ? 'is-selected' : ''}
                  aria-pressed={selected === index}>
                  <span className="enrollmentExplorer__classMark" aria-hidden="true">{selected === index ? '✓' : '✦'}</span>
                  <span className="enrollmentExplorer__className">{item.name}</span>
                  <span className="enrollmentExplorer__classAge">{item.age}</span>
                </button>
              ))}
            </div>
            <p className="enrollmentExplorer__hint">Cada criança vive essa fase do seu jeito. Nossa equipe ajuda você a conhecer a rotina da turma.</p>
          </div>

          <aside className="enrollmentExplorer__result" aria-labelledby="enrollmentExplorerSelection">
            <div className="enrollmentExplorer__drawing" aria-hidden="true">
              <span className="enrollmentExplorer__flower">✳</span>
              <span className="enrollmentExplorer__star">✦</span>
              <svg viewBox="0 0 260 135" fill="none"><path d="M12 100C56 30 90 129 130 56S215 19 245 64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 12"/><path d="M233 49l13 15-20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="enrollmentExplorer__resultBadge"><span aria-hidden="true">●</span> SUA TURMA PARA CONHECER</span>
            <div className="enrollmentExplorer__resultCopy" key={stage + turma.name} aria-live="polite" aria-atomic="true">
              <span className="enrollmentExplorer__resultStage">{current.name} <span aria-hidden="true">·</span> {turma.age}</span>
              <h3 id="enrollmentExplorerSelection">{turma.name}</h3>
              <p>{turma.description}</p>
            </div>
            <div className="enrollmentExplorer__next">
              <span>PRÓXIMO PASSO</span>
              <p>Venha ver os espaços, conhecer a rotina e tirar suas dúvidas pessoalmente.</p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={'Agendar visita para conhecer ' + turma.name + ' pelo WhatsApp'}>
                <span>Quero conhecer essa turma</span>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <small>Você vai conversar com a equipe pelo WhatsApp. A seleção não reserva uma vaga.</small>
            </div>
          </aside>
        </div>

        <div className="enrollmentExplorer__footnote">
          <span aria-hidden="true">✳</span>
          <p><strong>Um detalhe importante:</strong> na Educação Infantil, a idade da turma deve ser completada até 31 de março de 2027. Confirme o enquadramento e a disponibilidade com a secretaria.</p>
        </div>
      </div>
    </section>
  );
}

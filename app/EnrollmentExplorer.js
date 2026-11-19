'use client';
import Image from 'next/image';

import {useState} from 'react';

const groups = {
  infantil: {
    name: 'Educação Infantil',
    detail: 'Dos 2 aos 5 anos',
    short: 'Acolhimento, brincadeira e descobertas em cada fase.',
    classes: [
      {name:'Maternal I', age:'2 anos', description:'Primeiros vínculos, movimento e brincadeiras para quem está começando a vida escolar.'},
      {name:'Maternal II', age:'3 anos', description:'Mais linguagem, convivência e vontade de fazer as coisas sozinho.'},
      {name:'Jardim I', age:'4 anos', description:'Histórias, jogos e atividades que dão espaço às perguntas da turma.'},
      {name:'Jardim II', age:'5 anos', description:'Propostas que estimulam expressão, colaboração e preparação para a próxima etapa.'}
    ]
  },
  fundamental: {
    name: 'Ensino Fundamental',
    detail: 'Do 1º ao 5º ano',
    short: 'Conhecimento, autonomia e desafios que crescem com a criança.',
    classes: [
      {name:'1º ano', age:'Anos iniciais', description:'Um ano importante para leitura, escrita e hábitos de estudo.'},
      {name:'2º ano', age:'Anos iniciais', description:'Leitura, escrita e matemática ganham mais fluidez com a prática.'},
      {name:'3º ano', age:'Anos iniciais', description:'Produção de textos, resolução de problemas e trabalhos em grupo.'},
      {name:'4º ano', age:'Anos iniciais', description:'Atividades que pedem mais organização, leitura e raciocínio.'},
      {name:'5º ano', age:'Anos iniciais', description:'Consolidação dos conteúdos e preparação para os desafios do próximo ciclo.'}
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
          <p>Selecione a etapa para ver as turmas de 2027. Se precisar de orientação sobre idade e matrícula, nossa secretaria ajuda.</p>
        </div>

        <div className="enrollmentExplorer__grid">
          <div className="enrollmentExplorer__chooser">
            <div className="enrollmentExplorer__chooserHead">
              <div>
                <span className="enrollmentExplorer__miniLabel">COMECE POR AQUI</span>
                <h3>Qual etapa você procura?</h3>
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
            <p className="enrollmentExplorer__hint">Em dúvida entre duas turmas? A secretaria pode orientar sobre a idade de ingresso.</p>
          </div>

          <aside className="enrollmentExplorer__result" aria-labelledby="enrollmentExplorerSelection">
            <div className="enrollmentExplorer__mascot">
              <span className="enrollmentExplorer__mascotHalo" aria-hidden="true"/>
              <div className="enrollmentExplorer__mascotPortrait">
                <Image src="/Mascote Laranja com Coroa de Folhas.png" alt="Mascote da Escola Parque dando boas-vindas" width={850} height={900} sizes="180px" quality={76} loading="lazy"/>
              </div>
              <span className="enrollmentExplorer__mascotSpeech">{stage === 'infantil' && selected === 0 ? 'Oi, família!' : 'Que tal uma visita?'}</span>
              <span className="enrollmentExplorer__mascotSpark" aria-hidden="true">✦</span>
            </div>
            <span className="enrollmentExplorer__resultBadge"><span aria-hidden="true">●</span> SUA TURMA PARA CONHECER</span>
            <div className="enrollmentExplorer__resultCopy" key={stage + turma.name} aria-live="polite" aria-atomic="true">
              <span className="enrollmentExplorer__resultStage">{current.name} <span aria-hidden="true">·</span> {turma.age}</span>
              <h3 id="enrollmentExplorerSelection">{turma.name}</h3>
              <p>{turma.description}</p>
            </div>
            <div className="enrollmentExplorer__next">
              <span>PRÓXIMO PASSO</span>
              <p>Converse sobre horários, proposta pedagógica e disponibilidade antes de marcar a visita.</p>
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
          <p><strong>Idade de ingresso:</strong> na Educação Infantil, a idade da turma deve ser completada até 31 de março de 2027. Confirme o enquadramento e a disponibilidade com a secretaria.</p>
        </div>
      </div>
    </section>
  );
}

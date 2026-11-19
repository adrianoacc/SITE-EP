const stops = [
  {
    id: 'tour-chegada',
    theme: 'welcome',
    step: 'Começa aqui',
    eyebrow: 'A ESCOLA POR DENTRO',
    title: 'A escola começa pela porta da frente.',
    description: 'É aqui que os alunos chegam e que os encontros do dia começam.',
    photos: [
      {src: '/Fachada Vibrante da Escola Parque.png', alt: 'Fachada da Escola Parque', label: 'Fachada da escola'}
    ]
  },
  {
    id: 'tour-brincar',
    theme: 'play',
    step: 'Hora de brincar',
    eyebrow: 'ESPAÇO PARA BRINCAR',
    title: 'Dois parquinhos. Mil jeitos de brincar.',
    description: 'Os parquinhos convidam a correr, explorar os brinquedos e criar brincadeiras em grupo.',
    photos: [
      {src: '/12_parquinho_01.jpg', alt: 'Primeiro parquinho da Escola Parque com brinquedos ao ar livre', label: 'Parquinho 1'},
      {src: '/14_parquinho_02.jpg', alt: 'Segundo parquinho da Escola Parque com brinquedos coloridos', label: 'Parquinho 2'}
    ]
  },
  {
    id: 'tour-movimento',
    theme: 'sport',
    step: 'Corpo em movimento',
    eyebrow: 'QUADRA COBERTA',
    title: 'Uma quadra para jogar, correr e trabalhar em equipe.',
    description: 'Coberta e protegida, ela recebe jogos, educação física e atividades com a turma.',
    photos: [
      {src: '/11_quadra_esportiva.jpg', alt: 'Quadra esportiva coberta da Escola Parque', label: 'Quadra coberta'}
    ]
  },
  {
    id: 'tour-descobrir',
    theme: 'learn',
    step: 'Hora de descobrir',
    eyebrow: 'APRENDER E IMAGINAR',
    title: 'Um canto para estudar. Outro para imaginar.',
    description: 'As salas são climatizadas. Na sala de leitura, livros e histórias abrem espaço para perguntas e imaginação.',
    photos: [
      {src: '/05_sala_de_aula.png', alt: 'Alunos da Escola Parque em sala de aula', label: 'Salas climatizadas'},
      {src: '/sala de leitura.png', alt: 'Espaço de leitura da Escola Parque com livros e mesas infantis', label: 'Sala de leitura'}
    ]
  },
  {
    id: 'tour-conviver',
    theme: 'together',
    step: 'Momentos juntos',
    eyebrow: 'LANCHE, ENCONTROS E RECREIO',
    title: 'Pausa para lanchar, brincar e conversar.',
    description: 'Entre uma aula e outra, cantina, pátio e área de convivência recebem os momentos com os amigos.',
    photos: [
      {src: '/13_area_recreacao.jpg', alt: 'Área de recreação utilizada para a convivência na Escola Parque', label: 'Área de convivência'},
      {src: '/cantina.png', alt: 'Cantina da Escola Parque', label: 'Cantina'},
      {src: '/Pátio Escolar Colorido com Caminho Numérico.png', alt: 'Pátio colorido da Escola Parque', label: 'Pátio da escola'}
    ]
  }
];

export default function SchoolTour() {
  return (
    <section id="estrutura" className="structure schoolTour" aria-labelledby="schoolTourTitle">
      <div className="schoolTour__intro">
        <div className="schoolTour__introCopy">
          <span className="schoolTour__eyebrow"><span aria-hidden="true">✳</span> UM PASSEIO PELA ESCOLA PARQUE</span>
          <h2 id="schoolTourTitle">Porque a infância <em>não acontece só na sala de aula.</em></h2>
        </div>
        <div className="schoolTour__introSide">
          <p>Passe pelos parquinhos, pela quadra, pelas salas e pelos espaços que fazem parte do dia a dia.</p>
          <a href="#tour-chegada" className="schoolTour__scrollCue">Role para passear</a>
        </div>
      </div>

      <div className="schoolTour__chapters">
        {stops.map((stop, index) => (
          <article
            id={stop.id}
            className={'tourStop tourStop--' + stop.theme}
            style={{'--tour-layer': index + 1}}
            key={stop.id}
            aria-labelledby={stop.id + '-title'}
          >
            <div className="tourStop__copy">
              <div className="tourStop__topline"><span className="tourStop__marker" aria-hidden="true">{index + 1}</span><span>{stop.step}</span></div>
              <span className="tourStop__eyebrow">{stop.eyebrow}</span>
              <h3 id={stop.id + '-title'}>{stop.title}</h3>
              <p>{stop.description}</p>
              <div className="tourStop__bottom"><span aria-hidden="true" className="tourStop__sparkle">✳</span><span>{index === stops.length - 1 ? 'Nosso passeio termina aqui. Sua visita pode começar!' : 'Próxima parada logo abaixo'}</span></div>
            </div>
            <div className={'tourGallery tourGallery--' + stop.photos.length} aria-label={'Fotos: ' + stop.step}>
              {stop.photos.map((photo, photoIndex) => (
                <figure className="tourGallery__photo" key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading={index === 0 && photoIndex === 0 ? 'eager' : 'lazy'} decoding="async" />
                  <figcaption>{photo.label}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="schoolTour__closing">
        <div className="schoolTour__closingDecoration" aria-hidden="true">✳</div>
        <div>
          <span>GOSTOU DO PASSEIO?</span>
          <h3>As fotos mostram os espaços. <em>A visita mostra o clima daqui.</em></h3>
          <p>Marque um horário e veja os ambientes ao vivo.</p>
        </div>
        <a href="https://wa.me/5591993371903?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Parque%20para%202027." className="schoolTour__visit">Agendar uma visita</a>
      </div>
    </section>
  );
}

import '@dotlottie/player-component';

const Lottieplayer = ({ src, alt }: { src: string; alt: string }) => {
  return <dotlottie-player src={src} autoplay loop alt={alt} />;
};

export default Lottieplayer;

import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import PhotoGallery from "../components/PhotoGallery";

const Home = () => {
  return (
    <div className="mt-20">
      <HeroSection />
      <PhotoGallery />
      <Footer/>
    </div>
  );
};

export default Home;

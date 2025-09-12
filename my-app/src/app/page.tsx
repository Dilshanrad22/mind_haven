
import Navbar from "./components/navbar";
import HeroSection  from "./components/header01";
import HeroSection02  from "./components/header02";
import MentalHealthBlog from "./components/blog";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div >
      <Navbar />
      <HeroSection />
      <HeroSection02 />
      <MentalHealthBlog />
      
      
    </div>
  );
}

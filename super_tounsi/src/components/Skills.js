import meter1 from "../assets/img/clock (1).png";
import meter2 from "../assets/img/time.png";
import meter3 from "../assets/img/24-7.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <p>
                        "At our repair service, availability, rapidity, and efficiency are our guiding principles. We understand that when you need a repair, time is of the essence. That's why we prioritize being available when you need us most, with flexible scheduling and prompt response times. Our team is dedicated to completing repairs swiftly without compromising on quality, ensuring that your issues are resolved in a timely manner. We pride ourselves on our efficiency, utilizing the latest tools and techniques to get the job done right the first time. When you choose us, you can trust that your repair needs will be met with speed, precision, and reliability."
                        </p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5>Efficiency</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Image" />
                                <h5>Rapidity</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5>Availability</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}

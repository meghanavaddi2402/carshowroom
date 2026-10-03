import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="s1">

        <div className="c1">

          <h1>
            YOUR DREAM RIDE <br />
            <span className="spn"> STARTS HERE</span>
          </h1>
          
          <p>
            Discover premium cars designed for every journey.
          </p>

          <Link to="/cars" className="hero-btn">
            EXPLORE CARS
          </Link>

        </div>

      </section>

      {/* =========================
          STATS SECTION
      ========================= */}

      <section className="stats">

        <div className="stat-box">
          <h2>500+</h2>
          <p>Premium Cars</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Trusted Brands</p>
        </div>

        <div className="stat-box">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-box">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>

      </section>


      {/* =========================
          INTRO SECTION
      ========================= */}

      <section className="home-intro">

        <div className="intro-image">

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdNWMx__w79-7W20x97c08Gm-lH6M0jvFFAWx9EOX1cg&s=10"
            alt="Premium car"
          />

        </div>


        <div className="intro-content">

          <p className="section-label">
            THE SHOWROOM EXPERIENCE
          </p>

          <h2>
            MORE THAN A CAR.
            <span> IT'S YOUR STATEMENT.</span>
          </h2>

          <p>
            Explore a carefully selected collection of modern,
            stylish and performance-driven automobiles.
            Whether you are looking for everyday comfort or
            extraordinary performance, your next drive starts here.
          </p>

          <Link to="/cars" className="text-link">
            Explore Collection →
          </Link>

        </div>

      </section>


      {/* =========================
          FEATURED CARS
      ========================= */}

      <section className="featured">

        <div className="section-heading">

          <p className="section-label">
            OUR COLLECTION
          </p>

          <h2>
            FEATURED <span>RIDES</span>
          </h2>

          <p>
            Discover cars selected for style, performance and comfort.
          </p>

        </div>


        <div className="featured-grid">

          {/* CARD 1 */}

          <div className="featured-card">

            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d"
              alt="Luxury car"
            />

            <div className="featured-info">

              <span>PREMIUM</span>

              <h3>
                Luxury Performance
              </h3>

              <p>
                Designed for those who expect more
                from every journey.
              </p>

              <Link to="/cars">
                Explore →
              </Link>

            </div>

          </div>


          {/* CARD 2 */}

          <div className="featured-card">

            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="Sports car"
            />

            <div className="featured-info">

              <span>SPORTS</span>

              <h3>
                Performance Collection
              </h3>

              <p>
                Power, precision and an unforgettable
                driving experience.
              </p>

              <Link to="/cars">
                Explore →
              </Link>

            </div>

          </div>


          {/* CARD 3 */}

          <div className="featured-card">

            <img
              src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd"
              alt="Modern car"
            />

            <div className="featured-info">

              <span>MODERN</span>

              <h3>
                Everyday Excellence
              </h3>

              <p>
                Comfort and technology built for
                your everyday journey.
              </p>

              <Link to="/cars">
                Explore →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="why-us">

        <div className="section-heading">

          <p className="section-label">
            WHY CHOOSE US
          </p>

          <h2>
            DRIVE WITH <span>CONFIDENCE</span>
          </h2>

        </div>


        <div className="benefits">

          {/* BENEFIT 1 */}

          <div className="benefit">

            <div className="benefit-icon">
              ✓
            </div>

            <h3>
              Verified Cars
            </h3>

            <p>
              Every vehicle is carefully inspected
              before reaching our collection.
            </p>

          </div>


          {/* BENEFIT 2 */}

          <div className="benefit">

            <div className="benefit-icon">
              ◆
            </div>

            <h3>
              Premium Selection
            </h3>

            <p>
              Discover carefully selected vehicles
              from trusted automotive brands.
            </p>

          </div>


          {/* BENEFIT 3 */}

          <div className="benefit">

            <div className="benefit-icon">
              ₹
            </div>

            <h3>
              Easy Financing
            </h3>

            <p>
              Flexible options designed to make
              your dream car easier to own.
            </p>

          </div>


          {/* BENEFIT 4 */}

          <div className="benefit">

            <div className="benefit-icon">
              ★
            </div>

            <h3>
              Customer First
            </h3>

            <p>
              We focus on making every step of
              your car-buying journey simple.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="home-cta">

        <div>

          <p className="section-label">
            READY FOR THE NEXT JOURNEY?
          </p>

          <h2>
            FIND THE CAR THAT
            <span> FITS YOUR LIFE.</span>
          </h2>

          <p>
            Your perfect drive is waiting.
            Explore our collection today.
          </p>

          <Link
            to="/cars"
            className="cta-btn"
          >
            Explore All Cars →
          </Link>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="home-footer">

        <div>

          <h2>
            CAR SHOWROOM
          </h2>

          <p>
            Where your next journey begins.
          </p>

        </div>


        <div>

          <p>
            Premium Cars
          </p>

          <p>
            Trusted Service
          </p>

          <p>
            Exceptional Experience
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;
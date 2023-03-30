import './Landing.css';
import NavigationBar from '../components/NavigationBar'

function Landing() {
  return (
    <div className="home">
      <NavigationBar/>
      <header className='home-header'>
        <h1 >Welcome to Bonsai </h1>
        <p className='paragraph'>where your ideas can grow! share your passions, and be inspired. Join our community today and start planting the seeds of creativity in the world of tech!</p>
      </header>

    </div>
  );
}

export default Landing;

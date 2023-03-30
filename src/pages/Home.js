import './Landing.css';
import NavigationBarUser from '../components/NavigationBarUser'

function Home() {
  return (
    <div className="home">
      <NavigationBarUser/>
      <header className='home-header'>
        <h1 >Welcome User </h1>
        <p className='paragraph'>You will find posts here</p>
        </header>

    </div>
  );
}

export default Home;

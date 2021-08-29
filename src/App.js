import LondonWeather from './components/LondonWeather';
import Chart from './components/Chart';
import HeatIndexCalculator from './components/HeatIndexCalculatro';

function App() {

  return (
    <div className="container">
      <h1>Hello World</h1>
      <LondonWeather/>
      <Chart/>
      <HeatIndexCalculator/>
    </div>
  );
}

export default App;

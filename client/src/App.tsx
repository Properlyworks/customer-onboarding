import './App.css';
import { Header } from './components/Header/Header';
import Styling from './components/Styling';
export const App: React.FC = () => {

  return (
    <div>
      <Styling>
        <Header></Header>
      </Styling>
    </div>
  )
}

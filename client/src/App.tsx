import './App.css';
import { Header, Title, Styling } from '@components';
import { Layout } from '@components';
import { StepContainer } from '@components';
export const App: React.FC = () => {
  return (
    <div>
      <Styling>
        <Layout>
          <Title />
          <StepContainer />
        </Layout>
      </Styling>
    </div>
  )
}

import './App.css';
import {Title, Styling, MutliStepForm } from '@components';
import { Layout } from '@components';
export const App: React.FC = () => {
  return (
    <div>
      <Styling>
        <Layout>
          <Title />
          <MutliStepForm />
        </Layout>
      </Styling>
    </div>
  )
}

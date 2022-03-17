import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Dashboard from './view/Dashboard';
import MyNFT from './view/MyNFT';
import PixelCity from './components/Collectibles/PixelCity';


const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='bg-cover'>
          <div>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/mynft" component={MyNFT} />
              <Route exact path="/collectibles/pixelcity" component={PixelCity} />
            </Switch>
          </div>
        </div>
      </Suspense>
    </Router>
  );
}

export default React.memo(App)
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CFD from './components/CFD';
import Burndown from './components/Burndown';
import Kanban from './components/Kanban';
import ProjectProgress from './components/ProjectProgress';
import ItensProgress from './components/ItensProgress';
import ActionsPanel from './components/ActionsPanel';
import service from './service/flowservice';
import './Dashboard.css';

export default function Dashboard(props) {

  const [info, setInfo] = useState({});
  
  useEffect(() => {
    fetch(`data.json`)
      .then((r) => r.json())
      .then((data) =>{
          const info = service.getProjectInfo(data);
          setInfo(info);
      });
  }, []);

  if (!info.items)
        return (<div>Loading...</div>);

  const itemsFeatures = info.items.filter(item => !item.category || item.category === 'BACKLOG_ITEM');
    
  return (
    <div className="wrapper">
      <div className="panel-header">
        <Header project={info.project}  className="panel-header"/>
      </div>
      <div className="panel-backlog">
        <ItensProgress statusList={[...info.statusList]} items={[...itemsFeatures]} />
      </div>
      <div className="panel-status">
        <ProjectProgress milestones={info.milestones} statusList={[...info.statusList]} items={[...itemsFeatures]} actions={info.actions}/>
        <CFD statusList={[...info.statusList]} items={[...itemsFeatures]} />
        <Burndown statusList={[...info.statusList]} items={[...itemsFeatures]} holidays={[...info.holidays]} />
      </div>
      <div className="panel-kanban">
        <Kanban statusList={[...info.statusList]} items={[...info.items]} />
      </div>
      <div className="panel-risks">
        <ActionsPanel actions={info.actions} risks={info.risks} />
      </div>
      <div className="panel-footer">
        <Footer />
      </div>
    </div>
  );

}

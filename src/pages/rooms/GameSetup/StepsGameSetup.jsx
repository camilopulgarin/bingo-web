import React, { useEffect } from 'react';
import { SelectTableCount } from './components/SelectTableCount';
import SelectGameMode from './components/selectGameMode';
import SelectTables from './components/SelectTables';
import Summary from './components/Summary';


export const StepsGameSetup = ({ state, send }) => {


  const renderContent = () => {
    if(state.matches('selectTableCount')) return <SelectTableCount send={send} />;
    if(state.matches('selectGameMode')) return <SelectGameMode send={send} state={state}  />;
    if(state.matches('selectTables')) return <SelectTables send={send} context={state.context} />;
    if(state.matches('summary')) return <Summary state={state} send={send} context={state.context} />;
    if (state.matches('submitting')) return <p>Enviando partida...</p>; // ✅ aquí
    if (state.matches('done')) return <p>✅ Partida enviada con éxito</p>; // ✅ opcional
    return null;
  };

  return (
    <div >
      {renderContent()}
    </div>
  );
};
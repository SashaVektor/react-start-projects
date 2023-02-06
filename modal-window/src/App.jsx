import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
import './index.scss';

function App() {
  //  Первый способ не подходит для анимации(условный рендеринг)

  // const [open, setOpen] = useState(false);
  // {open && <div>
  //   <button className="open-modal-btn" onClick={() => setOpen(true)}>✨ Открыть окно</button>
  //     ...content...
  //    <svg height="200" viewBox="0 0 200 200" width="200" onClick={() => setOpen(false)} />
  //   </div>}


  // Второй способ подходит для анимации

  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <button className="open-modal-btn" onClick={() => setOpen(true)}>✨ Відкрити вікно з прапором</button>
      <Modal value={open} setOpen={setOpen} >
        <div className='items item1'></div>
        <div className='items item2'></div>
        <h3>Прапор України!</h3>
      </Modal>
    </div>
  );
}

export default App;

import React from 'react';
import './index.css';

const App = () => {
  return (
    <div>
      <div className="box-wrap">
        {/* 这个在box-wrap里面，受overflow影响 */}
        <div className="a-absolute-area"></div>
      </div>
      {/* 这个在box-wrap外面，不是一个层级，且层级比box-wrap高，不受影响 */}
      {/* 有因为relative.postion导致层级覆盖的。。。to be continue... */}
      <div className="out-absolute-area"></div>
    </div>
  );
};

export default App;

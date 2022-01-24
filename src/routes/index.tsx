import React from 'react';
import CSSetInterval from '../setTimeout';
import CSCallBack from '../hooks/usecallback/parent';
import CSUseSate from '../hooks/csusestate';
import CSUseContext from '../hooks/usecontext/parent';
import AboutWebpackVar from '../aboutWebpack';
import CSSlider from '../csRC/slider';
import CSTrans from '../other/index';
import TransTable from '../other/normal';
import Layout from '../other/layout';
import CSTree from '../antdUsage/tree';
import CSRCTree from '../csRC/tree';
const routes = [
  {
    path: '/csrctree',
    component: () => (
      <CSRCTree
        treeData={[
          {
            title: '0-0',
            key: '0-0',
            children: [
              { title: '0-0-0', key: '0-0-0' },
              { title: '0-0-1', key: '0-0-1' },
            ],
          },
          { title: '0-1', key: '0-1' },
        ]}
      />
    ),
  },
  { path: '/cstree', component: CSTree },
  { path: '/layout', component: Layout },
  { path: '/normal', component: TransTable },
  { path: '/other', component: CSTrans },
  { path: '/csslider', component: CSSlider },
  { path: '/aboutwebpack', component: AboutWebpackVar },
  { path: '/usecontext', component: CSUseContext },
  { path: '/csusestate', component: CSUseSate },
  { path: '/usecallback', component: CSCallBack },
  { path: '/setinterval', component: CSSetInterval },
  { path: '/', component: () => <h1>首页</h1> },
];

export default routes;

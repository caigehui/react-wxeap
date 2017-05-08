# rnApp

适用于`react-native`端，配置和`mobileApp`类似：

```
import React from 'react';
import Router from './router';
import { RnApp } from 'react-wxeap';
import RouterModel from './models/router';
import AppModel from './models/app';

let models = [
    AppModel,
    RouterModel
];

const app = new RnApp(models, { appName: 'wxeap' });

app.addRouter(() => <Router />);

app.start();

```
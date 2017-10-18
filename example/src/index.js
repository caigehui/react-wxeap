import { MobileApp } from 'react-wxeap';
import './index.css';
const routes = [
	{
		path: '/',
		model: require('./models/exampleList'),
		component: require('./routes/ExampleList')
	},
	{
		path: '/ComView',
		model: require('./models/layout/comView'),
		component: require('./routes/Layout/ComView')
	},
	{
		path: '/ComCell',
		model: require('./models/layout/comCell'),
		component: require('./routes/Layout/ComCell')
	},
		{
		path: '/ComScrollView',
		model: require('./models/layout/comScrollView'),
		component: require('./routes/Layout/ComScrollView')
	},
		{
		path: '/ComSeperator',
		model: require('./models/layout/comSeperator'),
		component: require('./routes/Layout/ComSeperator')
	},
		{
		path: '/ComNavigation',
		model: require('./models/layout/comNavigation'),
		component: require('./routes/Layout/ComNavigation')
	},

	{
		path: '/ComImageViewer',
		model: require('./models/popup/comImageViewer'),
		component: require('./routes/Popup/ComImageViewer')
	},
	{
		path: '/ComInputBox',
		model: require('./models/popup/comInputBox'),
		component: require('./routes/Popup/ComInputBox')
	},
	{
		path: '/ComOrgPicker',
		model: require('./models/popup/comOrgPicker'),
		component: require('./routes/Popup/ComOrgPicker')
	},
	{
		path: '/ComDatePicker',
		model: require('./models/popup/comDatePicker'),
		component: require('./routes/Popup/ComDatePicker')
	},
		{
		path: '/ComSearch',
		model: require('./models/popup/comSearch'),
		component: require('./routes/Popup/ComSearch')
	},
		{
		path: '/ComFilterBar',
		model: require('./models/dataEntry/comFilterBar'),
		component: require('./routes/DataEntry/ComFilterBar')
	},
		{
		path: '/ComFloatButton',
		model: require('./models/dataEntry/comFloatButton'),
		component: require('./routes/DataEntry/ComFloatButton')
	},
		{
		path: '/ComImagePicker',
		model: require('./models/dataEntry/comImagePicker'),
		component: require('./routes/DataEntry/ComImagePicker')
	},
		{
		path: '/ComImageUploadView',
		model: require('./models/dataEntry/comImageUploadView '),
		component: require('./routes/DataEntry/ComImageUploadView ')
	},	
		{
		path: '/ComSearchBar',
		model: require('./models/dataEntry/comSearchBar'),
		component: require('./routes/DataEntry/ComSearchBar')
	},
		{
		path: '/ComAccView',
		model: require('./models/dataDisplay/comAccView'),
		component: require('./routes/DataDisplay/ComAccView')
	},
	{
		path: '/ComStamp',
		model: require('./models/dataDisplay/comStamp'),
		component: require('./routes/DataDisplay/ComStamp')
	},
		{
		path: '/ComRichContentView',
		model: require('./models/dataDisplay/comRichContentView'),
		component: require('./routes/DataDisplay/ComRichContentView')
	},
		{
		path: '/ComDefaultAvatar',
		model: require('./models/dataDisplay/comDefaultAvatar'),
		component: require('./routes/DataDisplay/ComDefaultAvatar')
	},
	{
		path: '/ComPinchZoomView',
		model: require('./models/dataDisplay/comPinchZoomView'),
		component: require('./routes/DataDisplay/ComPinchZoomView')
	},
		{
		path: '/ComListView',
		model: require('./models/combination/comListView'),
		component: require('./routes/Combination/ComListView')
	},
		{
		path: '/ComChatView',
		model: require('./models/combination/comChatView'),
		component: require('./routes/Combination/ComChatView')
	},
];

const app = new MobileApp(routes);

app.start();


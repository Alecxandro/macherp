import './services/passport.js';
import * as shortcuts from './utils/shortcuts.js';

shortcuts.initialConfig.dt;
shortcuts.initialConfig.dbConfig();

const service = shortcuts.app;
const port = process.env.PORT || 3001;

service.use(
    shortcuts.crs({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    })
);

service.use(shortcuts.bodyPrs.urlencoded({ extended: false }));
service.use(shortcuts.bodyPrs.json());

console.log('JWT Secret:', process.env.JWT_SECRET);

service.use(shortcuts.initialConfig.pssprt.initialize());
service.use('/', shortcuts.rt);

service.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

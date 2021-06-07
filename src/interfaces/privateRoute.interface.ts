import { RouteProps, RouteComponentProps } from 'react-router-dom';

export default interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

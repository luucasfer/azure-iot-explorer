import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { TELEMETRY_EVENTS } from '../../constants/telemetry';
import { appConfig } from '../../../appConfig/appConfig';
export class AppInsightsClient {
    private static instance: ApplicationInsights;

    public static getInstance(): ApplicationInsights {
        if (!AppInsightsClient.instance) {
            const appInsights = new ApplicationInsights({ config: {
                autoTrackPageVisitTime: true,
                connectionString: appConfig.telemetryConnString
            } });
            try {
                appInsights.loadAppInsights();
                appInsights.trackEvent({name: TELEMETRY_EVENTS.INIT});
                AppInsightsClient.instance = appInsights;
            } catch (e) {
                // tslint:disable-next-line:no-console
                console.log(e);
            }
        }

        return AppInsightsClient.instance;
    }
}

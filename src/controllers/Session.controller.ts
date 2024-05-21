import { WebAppUser } from '@twa-dev/types'
import { App } from '../app'
import { Errors, throwError } from '../errors'
import { generateUUID } from '../utils/generateUUID';
import { sha256 } from '../utils/sha256';

export class SessionController {
    constructor(app: App) {
        this.appModule = app;
    }

    public init() {
        this.userData = window?.Telegram?.WebApp?.initDataUnsafe?.user;
        if (!this.userData) {
            throwError(Errors.USER_DATA_IS_NOT_PROVIDED);
        }

        this.userId = this.userData.id;
        this.userLocale = this.userData?.language_code;
        this.webAppStartParam = window?.Telegram?.WebApp?.initDataUnsafe?.start_param;
        this.platform = window?.Telegram?.WebApp?.platform;
        this.sessionId = generateUUID(String(this.getUserId()));
        this.saltedUserId = sha256(this.getUserId() + this.appModule.getApiToken());
    }

    public getSessionId() {
        return this.sessionId;
    }

    public getUserId() {
        return this.userId;
    }

    public getWebAppStartParam() {
        return this.webAppStartParam;
    }

    public getPlatform(){
        return this.platform;
    }

    public getUserLocale() {
        return this.userLocale;
    }

    public getSaltedUserId() {
        return this.saltedUserId;
    }

    public getUserData() {
        return this.userData;
    }

    private sessionId: string;
    private userId: number;
    private saltedUserId: string;
    private userData: WebAppUser;
    private platform: string;
    private webAppStartParam: string;
    private userLocale: string;

    private appModule: App;
}

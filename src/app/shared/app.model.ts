export interface Lookup {
    id?: number;
    name?: string;
}

export interface Application {
    id: number;
    name: string;
    url: string;
    browser: string;
    Sname: string;
}

export interface TestResultsReports {
    applicationID?: number;
    screenID?: string;
    testedBy?: string;
    testStartDate?: Date;
    testEndDate?: Date;
    testOutput?: string;
    testedByUser?: string[];
    screenIDList?: string[];
}

export interface TestScenario {
    componentMappingId?: number;
    testOrder?: number;
    screen?: Screen;
    testcase?: string;
    isEdit?: boolean;
}
export interface Screen{
    screenName?:string;
    screenID?:number
}

export interface ComponentMapping {
    componentId?: number;
    applicationName?: string;
    componentMapping?: Array<TestScenario>;
}

export interface Login {
    applicationsList?: string[];
    usersList?: string[];
}
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
    screen?: number;
    testcase?: string;
    isEdit?: boolean;
}
export interface ComponentMapping {
    componentId?: number;
    componentMapping?: Array<TestScenario>;
}

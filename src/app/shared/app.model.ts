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

export interface TestResultsReports{

    applicationID?: string;
    screenID?: string;
    testedBy?: string;
    testFromDate?: Date;
    testToDate?: Date;
    testOutput?: string;

}
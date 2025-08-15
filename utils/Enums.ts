

export enum LocatorTypes {
    BTN = 'Button',
    CHK = 'Check box',
    CBO = 'Combo box',
    DLG = 'Common dialog',
    DTP = 'Date picker',
    DDL = 'Dropdown List',
    ICO = 'Icon',
    DRI = 'Dropdown Item',
    FRM = 'Form',
    FRA = 'Frame',
    IMG = 'Image',
    LBL = 'Label',
    LNK = 'Links/Anchor Tags',
    LST = 'List box',
    MNU = 'Menu',
    RDO = 'Radio button / group',
    RTF = 'RichTextBox',
    TBL = 'Table',
    TBLR = 'Table Row',
    TAB = 'TabStrip',
    TXA = 'Text Area',
    TXT = 'Text box',
    CHV = 'Chevron',
    DGD = 'Data grid',
    DBL = 'Data list',
    DIR = 'Directory list box',
    DRV = 'Drive list box',
    FIL = 'File list box',
    PNL = 'Panel/Fieldset',
    PRG = 'ProgressBar',
    SLD = 'Slider',
    SPN = 'Spinner',
    STA = 'StatusBar',
    TMR = 'Timer',
    TLB = 'Toolbar',
    TRE = 'TreeView',
    CARD = 'Card',
    SWT = 'Switch'
}


export enum SourceTypes {
    AMP = "AMP",
    ANDROID = "Android", 
    HTTP = "HTTP",
    IOS = "iOS",
    JAVASCRIPT = "JavaScript",
    NODE = "Node",
    PYTHON = "Python",
    SNOWFLAKE = "Snowflake",
    WEBHOOK_SOURCE = "Webhook Source"
}

export enum DestinationTypes {
    AMAZON_S3 = "Amazon S3",
    AMPLITUDE = "Amplitude",
    BIGQUERY = "BigQuery",
    HUBSPOT = "HubSpot",
    MIXPANEL = "Mixpanel",
    POSTGRES = "Postgres",
    REDSHIFT = "Redshift",
    SNOWFLAKE = "Snowflake",
    WEBHOOK = "Webhook"
}

export enum CardStatus {
    ENABLED = "Enabled",
    DISABLED = "Disabled",
    CONNECTED = "Connected",
    DISCONNECTED = "Disconnected"
}
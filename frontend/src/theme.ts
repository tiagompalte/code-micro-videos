import {createMuiTheme, SimplePaletteColorOptions} from "@material-ui/core";
import {PaletteOptions} from "@material-ui/core/styles/createPalette";
import {green, red} from "@material-ui/core/colors";

const palette: PaletteOptions = {
    primary: {
        main: "#79aec8",
        contrastText: "#fff"
    },
    secondary: {
        main: "#4db5ab",
        contrastText: "#fff"
    },
    background: {
        default: "#fafafa"
    },
    error: {
        main: red.A400
    },
    success: {
        main: green.A400,
        contrastText: "#fff"
    }
};

const theme = createMuiTheme({
    palette,
    overrides: {
        MUIDataTable: {
            paper: {
                boxShadow: "none"
            }
        },
        MUIDataTableToolbar: {
            root: {
                minHeight: "58px",
                background: palette!.background!.default
            },
            icon: {
                color: (palette!.primary as SimplePaletteColorOptions)!.main,
                '&:hover, &:active, &:focus': {
                    color: '#055a52'
                }
            },
            iconActive: {
                color: '#055a52',
                '&:hover, &:active, &:focus': {
                    color: '#055a52'
                }
            }
        },
        MUIDataTableHeadCell: {
            fixedHeader: {
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: (palette!.primary as SimplePaletteColorOptions)!.main,
                color: '#ffffff',
                '&[aria-sort]': {
                    backgroundColor: '#459ac4'
                }
            },
            sortActive: {
                color: '#fff'
            },
            sortAction: {
                alignItems: 'center'
            },
            sortLabelRoot: {
                '& svg': {
                    color: '#fff !important'
                }
            }
        },
        MUIDataTableSelectCell: {
            headerCell: {
                backgroundColor: (palette!.primary as SimplePaletteColorOptions)!.main,
                '& svg': {
                    color: (palette!.primary as SimplePaletteColorOptions)!.main
                }
            }
        },
        MUIDataTableToolbarSelect: {
            title: {
                color: (palette!.primary as SimplePaletteColorOptions)!.main
            },
            iconButton: {
                color: (palette!.primary as SimplePaletteColorOptions)!.main
            }
        },
        MUIDataTableBodyRow: {
            root: {
                '&:nth-child(odd)': {
                    backgroundColor: palette.background?.default
                }
            }
        },
        MUIDataTablePagination: {
            root: {
                color: (palette!.primary as SimplePaletteColorOptions)!.main
            }
        }
    }
})

export default theme
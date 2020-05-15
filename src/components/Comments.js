import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { links } from "../Config";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  paperTable: {
    height: 708,
    position: "relative",
    top: 166,
    marginLeft: "30%",
    marginRight: "30%",
    border: "1px solid #bdbdbd"
  },
  backButton: {
    backgroundColor: "#1976d2"
  },
  backHomeButton: {
    paddingBottom: 12,
    position: "relative",
    top: 153,
    marginLeft: "30%",
    fontSize: "xx-large",
    fontWeight: 600
  },
  totalCount: {
    position: "relative",
    top: 153,
    marginLeft: "30%",
    fontSize: "xx-large",
    fontWeight: 600
  },
  // rowColumn: {
  //   border: "1px solid"
  // },
  insideTable: {
    marginLeft: "1%",
    position: "absolute"
  },
  [theme.breakpoints.down("361")]: {
    totalCount: {
      top: 43,
      marginLeft: "1%",
      fontSize: 16,
      fontWeight: 600
    },
    backHomeButton: {
      paddingBottom: 12,
      top: 43,
      marginLeft: "1%",
      fontSize: 16,
      fontWeight: 600
    },
    paperTable: {
      top: 45,
      marginLeft: "1%",
      marginRight: "-3.5%",
      marginBottom: "24%"
    },
    insideTable: {
      marginLeft: "0%",
      position: "absolute"
    },
    backButton: {
      backgroundColor: "#1976d2",
      padding: "3px 10px",
      fontSize: 11
    },
    backArrow: {
      fontSize: 15
    },
    rowColumn: {
      borderBottom: "1px solid",
      overflow: "overlay"
    }
  },

  [theme.breakpoints.between("361", "xs")]: {
    totalCount: {
      top: 43,
      marginLeft: "1%",
      fontSize: 16,
      fontWeight: 600
    },
    backHomeButton: {
      paddingBottom: 12,
      top: 43,
      marginLeft: "1%",
      fontSize: 16,
      fontWeight: 600
    },
    paperTable: {
      top: 45,
      marginLeft: "1%",
      marginRight: "-3.5%",
      marginBottom: "24%"
    },
    insideTable: {
      marginLeft: "0%",
      position: "absolute"
    },
    backButton: {
      backgroundColor: "#1976d2",
      padding: "3px 10px",
      fontSize: 11
    },
    rowColumn: {
      border: "1px solid",
      overflow: "overlay"
    },
    backArrow: {
      fontSize: 15
    }
  }
}));

const styles = theme => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined
    }
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  },
  tableHeadingone: {
    backgroundColor: "#dee2e6",
    border: "1px solid"
  },
  rowColumn: {
    borderBottom: "1px solid"
  }
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };
  // inside row
  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.rowColumn,
          {
            [classes.noClick]: onRowClick == null
          }
        )}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick,
          classes.tableHeadingone
        )}
        variant="head"
        style={{ height: headerHeight, backgroundColor: "#dee2e6" }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit"
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

export default function Comments(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const date = props.match.params.date;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(links.backendURL + "comments")
      .then(response => {
        return response.json();
      })
      .then(usersResponse => {
        setUsers(usersResponse);
      })
      .catch(error => console.log("error is", error));
  }, []);

  return (
    <div>
      <Typography className={classes.backHomeButton} color="textSecondary">
        <Link to={`/`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.backButton}
          >
            <ArrowBackIosIcon className={classes.backArrow} />
            Go to home
          </Button>
        </Link>
      </Typography>
      <Paper className={classes.paperTable}>
        <VirtualizedTable
          rowCount={users.length}
          className={classes.insideTable}
          rowGetter={({ index }) => users[index]}
          columns={[
            {
              width: 400,
              backgroundColor: "#dee2e6",
              label: "Mobile Number",
              dataKey: "mobilenumber"
            },
            {
              width: 400,
              backgroundColor: "#dee2e6",
              label: "Comment",
              dataKey: "comment"
            }
          ]}
        />
      </Paper>
    </div>
  );
}

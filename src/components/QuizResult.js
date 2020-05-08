import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { links } from "../Config";

const useStyles = makeStyles(theme => ({
  paperTable: {
    height: 708,
    position: "relative",
    top: 166,
    marginLeft: "30%",
    marginRight: "30%",
    border: "1px solid #bdbdbd"
  },

  totalCount: {
    position: "relative",
    top: 153,
    marginLeft: "30%",
    fontSize: "xx-large",
    fontWeight: 600
  },
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
    paperTable: {
      top: 45,
      marginLeft: "1%",
      marginRight: "-3.5%",
      marginBottom: "24%"
    },
    insideTable: {
      marginLeft: "0%",
      position: "absolute"
    }
  },

  [theme.breakpoints.between("361", "xs")]: {
    totalCount: {
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

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
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
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
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

const sample = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9]
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default function QuizResult(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const date = props.match.params.date;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(links.backendURL + "usersresponse?allresult=true&date=" + `${date}`)
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
      <Typography className={classes.totalCount} color="textSecondary">
        Total Number of participants: {users.length}
      </Typography>
      <Paper className={classes.paperTable}>
        <VirtualizedTable
          rowCount={users.length}
          className={classes.insideTable}
          rowGetter={({ index }) => users[index]}
          columns={[
            {
              width: 200,
              label: "Time",
              dataKey: "time"
            },
            {
              width: 200,
              label: "Name of participant",
              dataKey: "fullname"
            },
            {
              width: 180,
              label: "City",
              dataKey: "city"
            },
            {
              width: 150,
              label: "Score",
              dataKey: "score"
            }
          ]}
        />
      </Paper>
    </div>
  );
}

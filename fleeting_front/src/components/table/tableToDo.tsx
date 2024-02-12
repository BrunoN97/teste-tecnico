import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { z } from "zod";
import { getToDo } from "../../service/LoginService";
import { tableCellClasses } from "@mui/material/TableCell";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import styles from "./tableToDo.module.css";
import FiltersToDo from "../filters/filtersToDo";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const filtersSchema = z.object({
  status: z.string(),
  title: z.string(),
});

type FiltersSchema = z.infer<typeof filtersSchema>;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FiltersSchema>({
    resolver: zodResolver(filtersSchema),
  });

  const fetchData = async () => {
    const result = await getToDo(rowsPerPage, page + 1, status, title);
    setTodoData(result);
  };

  const [status, setStatus] = React.useState("");
  const [title, setTitle] = React.useState("");

  async function handleSendFilter(data: FiltersSchema) {
    if (data.status) {
      await setStatus(data.status);
    }
    if (data.title) {
      await setTitle(data.title);
    }
    setPage(0);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [todoData, setTodoData] = React.useState<{
    data: any[];
    total: number;
  }>({
    data: [],
    total: 0,
  });

  React.useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, status, title]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todoData.data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.divTable}>
      <div className={styles.divFilters}>
        <form onSubmit={handleSubmit(handleSendFilter)}>
          <FiltersToDo label="Status" {...register("status")} />
          <FiltersToDo label="Titulo" {...register("title")} />
          <Button
            type="submit"
            variant="outlined"
            className={styles.buttonFilter}
          >
            Filtrar
          </Button>
        </form>
      </div>

      <TableContainer component={Paper} className={styles.tableToDo}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Titulo</StyledTableCell>
              <StyledTableCell align="left">Descricao</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? todoData.data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : todoData.data
            ).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell style={{ width: 400 }} align="left">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell style={{ width: 160 }} align="left">
                  {row.status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={todoData.total}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import NutritionDonutChart from "./NutritionDonutChart";
import CardContent from "@mui/material/CardContent";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function BasicAccordion({ nutritionData }) {
  return (
    <div>
      <Accordion
        sx={{
          background: "none",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" sx={{ fontWeight: "400" }}>
            Nutrition Facts
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            <TableContainer component={Paper}>
              <Table aria-label="nutrition data table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Percent of Daily Needs</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nutritionData &&
                    nutritionData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.percentOfDailyNeeds}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <NutritionDonutChart nutritionData={nutritionData} />
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BasicAccordion;

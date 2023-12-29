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
          <Typography
            variant="h6"
            sx={{ fontWeight: "400", paddingBottom: "0", marginBottom: "0" }}
          >
            Show Full Nutrition Label
          </Typography>
        </AccordionSummary>

        {/* <CardContent> */}
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
        {/* <NutritionDonutChart nutritionData={nutritionData} /> */}
        <AccordionDetails>
          <Typography>
            * Percent Daily Values are based on a 2,000 calorie diet. Your daily
            values may be higher or lower depending on your calorie needs.
          </Typography>
          <Typography>
            ** Nutrient information is not available for all ingredients. Amount
            is based on available nutrient data.
          </Typography>
          <Typography>
            (-) Information is not currently available for this nutrient. If you
            are following a medically restrictive diet, please consult your
            doctor or registered dietitian before preparing this recipe for
            personal consumption.
          </Typography>
          {/* </CardContent> */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BasicAccordion;

import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import ReCAPTCHA from 'react-google-recaptcha';
import Input from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import InputMask from 'react-input-mask';

import Country from '../../common/country/Country';
import InfoBar from '../../common/infoBar';
import Title from '../../common/title';
import * as actions from './actions';
import Progress from '../../common/progress';
import HeadMeta from '../../common/headMeta';
import hzconfig from '../../../../config/horizon';


const styles = theme => ({ // eslint-disable-line
  root: {
    flexGrow:  1,
    minHeight: '100%',
  },
  captblock: {
    display:        'flex',
    justifyContent: 'center',
  },
  sizeCompanytextField: {
    width:  '100%',
    margin: 0,
  },
  paddingTextField: {
    padding: '0px 10px',
  },
  pHeadText: {
    fontSize:   20,
    color:      '#646464',
    fontWeight: 300,
    padding:    10,
    textAlign:  'center',
  },
  pHead: {
    fontSize:   20,
    color:      '#646464',
    fontWeight: 300,
    padding:    10,
  },
  p: {
    marginTop:  10,
    fontSize:   15,
    color:      '#646464',
    fontWeight: 300,
  },
  titlebox: {
    textAlign: 'center',
  },
  bottomspacexs: {
    height: 25,
  },
  bottomspace: {
    height: 50,
  },
  bottomspace75: {
    height: 75,
  },
  bottomspaceL: {
    height: 100,
  },
  bottomspace125: {
    height: 125,
  },
  timeStyle: {
    width: '215px',
  },
  backgroundImage: {
    backgroundImage:              'url("/images/assessment/assessment.svg")',
    backgroundRepeat:             'no-repeat',
    height:                       '400px',
    backgroundPosition:           '41% 0px',
    '@media (max-width: 1279px)': {
      backgroundImage: 'none',
      display:         'none',
    },
  },
  topspace50: {
    height: 50,
  },
  topspace: {
    height: 100,
  },
  button: {
    fontWeight:      300,
    backgroundColor: '#309664',
    borderRadius:    5,
    fontSize:        16,
    height:          40,
    color:           '#FFF',
    textDecoration:  'none',
    padding:         '10px 14px 10px 14px',
    margin:          '0px',
    '&:hover':       {
      backgroundColor: '#309664',
      color:           'black',
    },
  },
  buttonPosition: {
    display:        'flex',
    justifyContent: 'center',
  },
  formControl: {
    width:        '100%',
    marginTop:    '16px',
    marginBottom: '-13px',
  },
  mdUp: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mdDown: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  smDown: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  smUp: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});
const meta = {
  location:    'cloud-assessment',
  title:       'Cloud Assessment',
  description: 'Gain a better understanding of the cloud adoption strategies as well as costs and risks associated with cloud migration. We help organisations develop efficient and effective plans for their cloud adoption journey. Get an assessment of: Incident management maturity, Tooling maturity, Deployment maturity, Software delivery maturity, Architecture maturity.',
  keywords:    'cloud adoption; Free Cloud Adoption Assessment; cloud migration Assessment; Incident management maturity Assessment; Tooling maturity Assessment; Deployment maturity Assessment; Software delivery maturity Assessment; Architecture maturity Assessment; Free cloud assessment;',
  imageSrc:    '/images/assessment/assessment.svg',
};

function TextMaskCustom(props) {
  return (
    <InputMask {...props} mask="+999(999)999-999999" maskChar=" " />
  );
}

const companySize = [
  {
    value: '',
    label: '',
  },
  {
    value: '<50',
    label: 'Under 50',
  },
  {
    value: '50-100',
    label: '50-100',
  },
  {
    value: '100-250',
    label: '100-250',
  },
  {
    value: '250-500',
    label: '250-500',
  },
  {
    value: '500-1000',
    label: '500-1000',
  },
  {
    value: '1000-2500',
    label: '1000-2500',
  },
  {
    value: '2500+',
    label: '2500+',
  },
];


export class CloudAssessment extends React.Component { // eslint-disable-line

  static contextTypes = { i18n: PropTypes.object };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  isEmailValid = false;

  handleValidationString = (field) => {
    const { l } = this.context.i18n;
    const { input, handleValidation } = this.props;
    const res = {
      name:        'first name',
      lastName:    'last name',
      companyName: 'company name',
      sizeCompany: 'size company',
      jobTitle:    'job title',
      country:     'country',
      phone:       'phone number',
      callTime:    'call time',
    };
    const string = field === 'phone' ? input[field].trim().replace(/(\s|\+|-|\(|\))/g, '') : input[field].trim();
    const length = field === 'phone' ? 6 : 1;
    if (string.length > length) {
      handleValidation(field, '');
      return true;
    } else {
      handleValidation(field, l(`Please enter your ${res[field]}`));
      return false;
    }
  };
  handleValidationEmail = () => {
    const { l } = this.context.i18n;
    const { input, handleValidation } = this.props;
    const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    const email = input.email.trim();
    if (email.length > 0) {
      if (emailValid.test(email)) {
        this.isEmailValid = true;
        handleValidation('email', '');
      } else {
        this.isEmailValid = false;
        handleValidation('email', l('Email is not valid'));
      }
    } else {
      this.isEmailValid = false;
      handleValidation('email', l('Please enter your email'));
    }
  };

  handleSubmit = () => {
    const { l } = this.context.i18n;
    const { input, submit, clearInput, handleShowMessage, clearCountries } = this.props;

    // Email validation
    this.handleValidationEmail();

    // String validation
    const isNameValid = this.handleValidationString('name');
    const isLastNameValid = this.handleValidationString('lastName');
    const isCompanyNameValid = this.handleValidationString('companyName');
    const isCompanySizeValid = this.handleValidationString('sizeCompany');
    const isJobTitleValid = this.handleValidationString('jobTitle');
    const isCountryValid = this.handleValidationString('country');
    const isPhoneNumberValid = this.handleValidationString('phone');
    const isCallTimeValid = this.handleValidationString('callTime');

    if (this.isEmailValid &&
      isNameValid &&
      isCompanyNameValid &&
      isPhoneNumberValid &&
      isCompanySizeValid &&
      isLastNameValid &&
      isJobTitleValid &&
      isCountryValid &&
      isCallTimeValid) {
      const failure = l('Server request error');
      const success = l('Your request was accepted. We will try to contact you at the specified time.');
      submit(input).then((res) => {
        handleShowMessage(res ? success : failure);
        res && clearInput() && clearCountries();
      });
      this.isEmailValid = false;
    }
  };

  render() {
    const { input, validation, handleInput, classes, isSubmitting } = this.props;
    const { l } = this.context.i18n;
    return (
      <div className={classes.root} >
        <HeadMeta meta={meta} />
        <div className={classes.titlebox}>
          <Title title={l('Cloud Assessment')} />
        </div>
        <Grid container spacing={0}>

          <Grid item xs={12} sm={1} md={2} lg={2} xl={2} />
          <Grid item xs={12} sm={10} md={8} lg={9} xl={8}>
            <p className={classes.pHeadText}>{l('We offer a free assessment to help you gain a better understanding of the cloud adoption strategies as well as costs and risks associated with cloud migration. You will be getting a report outlining how to improve resilience as well as suggestions on how to reduce run costs.')}</p>
          </Grid>
          <Grid item xs={12} sm={1} md={2} lg={1} xl={2} />
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} />
          <Grid item xs={12} sm={8} md={8} lg={9} xl={8}>
            <p className={classes.pHead}>{l('Please fill in the form and we will contact you at the specified time.')}</p>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={1} xl={2} />
          {isSubmitting && <Progress />}
          <Grid item xs={12} sm={2} md={2} lg={2} />
          <Grid item xs={12} sm={8} md={8} lg={4} >
            <div className={classes.paddingTextField}>
              <TextField
                required
                type="text"
                margin="normal"
                id="assessment-name"
                value={input.name}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="First Name"
                error={!!validation.name.message}
                onBlur={() => this.handleValidationString('name')}
                helperText={validation.name.message}
                onChange={e => handleInput('name', e.target.value)}
                fullWidth
              />
              <TextField
                required
                type="text"
                margin="normal"
                id="assessment-last-name"
                value={input.lastName}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Last Name"
                error={!!validation.lastName.message}
                onBlur={() => this.handleValidationString('lastName')}
                helperText={validation.lastName.message}
                onChange={e => handleInput('lastName', e.target.value)}
                fullWidth
              />
              <TextField
                required
                type="email"
                margin="normal"
                value={input.email}
                id="assessment-email"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Email"
                error={!!validation.email.message}
                onBlur={this.handleValidationEmail}
                helperText={validation.email.message}
                onChange={e => handleInput('email', e.target.value)}
                fullWidth
              />
              <TextField
                required
                type="text"
                margin="normal"
                value={input.companyName}
                id="assessment-company-name"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Company name"
                error={!!validation.companyName.message}
                onBlur={() => this.handleValidationString('companyName')}
                helperText={validation.companyName.message}
                onChange={e => handleInput('companyName', e.target.value)}
                fullWidth
              />

              <TextField
                select
                label="Company size"
                className={classes.sizeCompanytextField}
                value={input.sizeCompany}
                id="assessment-company-size"
                onChange={e => handleInput('sizeCompany', e.target.value)}
                SelectProps={{
                  native:    true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                error={!!validation.sizeCompany.message}
                onBlur={() => this.handleValidationString('sizeCompany')}
                helperText={validation.sizeCompany.message}
                margin="normal"
              >
                {companySize.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                required
                type="text"
                margin="normal"
                value={input.jobTitle}
                id="assessment-job-title"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Job Title"
                error={!!validation.jobTitle.message}
                onBlur={() => this.handleValidationString('jobTitle')}
                helperText={validation.jobTitle.message}
                onChange={e => handleInput('jobTitle', e.target.value)}
                fullWidth
              />
              <FormControl className={classes.formControl}>
                <Input
                  required
                  type="text"
                  margin="dense"
                  value={input.phone}
                  id="assessment-phone-number"
                  placeholder={l('Phone number')}
                  error={!!validation.phone.message}
                  onBlur={() => this.handleValidationString('phone')}
                  onChange={e => handleInput('phone', e.target.value)}
                  inputComponent={TextMaskCustom}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                  fullWidth
                />
                <FormHelperText style={{ color: 'red' }}>{validation.phone.message}</FormHelperText>
              </FormControl>
              <Country
                required
                type="text"
                margin="dense"
                value={input.country}
                id="assessment-country"
                error={!!validation.country.message}
                helperText={validation.country.message}
                handleInput={handleInput}
                onBlur={() => this.handleValidationString('country')}
                onChange={e => handleInput('country', e.target.value)}
              />
              <p className={classes.p}>{l('Please select a date and time for a callback:')}</p>
              <Grid className={classes.bottomspacexs} />
              <Grid container spacing={0}>
                <Grid item xs={1} sm={12} />
                <Grid item xs={8} sm={6}>
                  <TextField
                    className={classes.timeStyle}
                    label={l('Callback time:')}
                    value={input.callTime}
                    id="assessment-datetime-local"
                    type="datetime-local"
                    onChange={e => handleInput('callTime', e.target.value)}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!validation.callTime.message}
                    onBlur={() => this.handleValidationString('callTime')}
                    helperText={validation.callTime.message}
                  />
                </Grid>
                <Grid item xs={3} sm={6} />
              </Grid>
              <Grid className={`${classes.bottomspace} ${classes.smUp}`} />
              <Grid className={`${classes.bottomspace} ${classes.smDown}`} />
              <Grid container spacing={0}>
                <Grid item xs={12} />
                <Grid item xs={12} className={classes.captblock}>
                  <ReCAPTCHA
                    className={classes.capt}
                    ref="recaptcha" // eslint-disable-line
                    sitekey={hzconfig.app.googleCaptcha.siteKey}
                    onChange={value => handleInput('recaptcha', value)}
                  />
                </Grid>
                <Grid item xs={12} />
              </Grid>
              <Grid className={`${classes.bottomspace} ${classes.smUp}`} />
              <Grid className={`${classes.bottomspace} ${classes.smDown}`} />
              <Grid container spacing={0}>
                <Grid className={classes.buttonPosition} item xs={12}>
                  <Button
                    raised
                    id="assessment-us-submit"
                    className={classes.button}
                    onClick={this.handleSubmit}
                    disabled={!input.recaptcha}
                  >{l('SUBMIT')}</Button>
                </Grid>
              </Grid>
              <Grid className={`${classes.bottomspacexs} ${classes.smUp}`} />
              <Grid className={`${classes.bottomspace} ${classes.smUp}`} />
              <Grid className={`${classes.bottomspaceL} ${classes.smDown}`} />
            </div>
          </Grid>
          <Grid className={classes.backgroundImage} item xs={12} sm={2} md={2} lg={6} />
        </Grid>
        <InfoBar />
      </div>
    );
  }
}

CloudAssessment.propTypes = {
  input:             PropTypes.shape({}).isRequired,
  submit:            PropTypes.func.isRequired,
  classes:           PropTypes.shape({}).isRequired,
  clearInput:        PropTypes.func.isRequired,
  validation:        PropTypes.shape({}).isRequired,
  handleInput:       PropTypes.func.isRequired,
  isSubmitting:      PropTypes.bool.isRequired,
  clearCountries:    PropTypes.func.isRequired,
  handleValidation:  PropTypes.func.isRequired,
  handleShowMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  input:        state.assessment.input,
  validation:   state.assessment.validation,
  isSubmitting: state.assessment.isSubmitting,
});

export default connect(mapStateToProps, actions)(withStyles(styles)(CloudAssessment));

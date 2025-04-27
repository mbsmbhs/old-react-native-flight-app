import cities from '../../airports.json';
import momentJ from 'moment-jalaali';

export default flightReducers = (state = {
  tedadBozorgSal: 0,
  tedadKhordSal: 0,
  tedadNozad: 0,
  isReturnEnabled: false,
  zIndex1: 3,
  cities,
  flightTo: '',
  flightFrom: '',
  FromCityCode: '',
  ToCityCode: '',
  toSelectedCity: '',
  fromSelectedCity: '',
  hidden1: true,
  hidden2: false,
  flightDate: null,
  returnDate: null,
  requestObject: null,
  error: 'not Submitted',
  disabledSearchButton: null,

  isMale: true,
  BuyerDetails: null,
  passengersDetails: null,
  BuyerDetailsError: 'not Submitted',
  meliyat: [],

  token: null,
  sessid: null,
  session_name: null,

  userName: '',
  userPassword: '',
  loginError: 'not Submitted',
  loginError: undefined,

  flightListResult: [],

  flightList: [],

  selectedFlight: null,

  radioFilterNonStop: true,
  radioFilterWithOneStop: true,
  radioFilterWithMoreStop: true,
  radioSortByPriceRising: false,
  radioSortByPriceLowering: false,
  radioFilterClassEco: false,
  radioFilterClassEcoDis: false,
  radioFilterClassEcoPer: false,
  radioFilterClassBusiness: false,
  radioFilterClassBusinessDis: false,
  radioFilterClassBusinessPer: false,
  radioFilterClassFirst: false,
  radioFilterClassFirstDis: false,
  radioFilterClassFirstSui: false,
  radioFilterClassFirstPer: false,
  radioFilterClassPer: false,
  radioFilterClassAll: true,

  minPrice: 0,
  maxPrice: null,

  whichScreen: null,

  resrveResult: null

}, action) => {
  switch (action.type) {

    case 'COUNTER_BOZORGSAL_PLUS':
      // +1 to tedadBozorgSal till it get 9 total persons
      return {
        ...state,
        tedadBozorgSal: (state.tedadBozorgSal + state.tedadKhordSal + state.tedadNozad < 9) ? (state.tedadBozorgSal + 1) : (state.tedadBozorgSal)
      }
      break;

    case 'COUNTER_BOZORGSAL_Minus':
      // -1 to tedadBozorgSal till it get 0
      // if tedadBozorgSal gets 0 set tedadKhordSal and tedadNozad to 0
      // tedadkhordas+nozad at max = 2 x tedadBozorgsal
      return {
        ...state,
        tedadBozorgSal: (state.tedadBozorgSal > 0) ? (state.tedadBozorgSal - 1) : (state.tedadBozorgSal),
        tedadKhordSal: ((state.tedadBozorgSal) * 2 <= state.tedadKhordSal + state.tedadNozad) ? (0) : (state.tedadKhordSal),
        tedadNozad: ((state.tedadBozorgSal) * 2 <= state.tedadKhordSal + state.tedadNozad) ? (0) : (state.tedadNozad)
      }
      break;

    case 'COUNTER_KHORDSAL_PLUS':
      // if tedadBozorgSal is 0 no child is allowed
      // +1 to tedadKhordSal till it get 9 total persons
      // tedadkhordas+nozad at max = 2 x tedadBozorgsal
      return {
        ...state,
        tedadKhordSal: (state.tedadBozorgSal > 0) ? ((state.tedadBozorgSal + state.tedadKhordSal + state.tedadNozad < 9) && ((state.tedadBozorgSal) * 2 > state.tedadKhordSal + state.tedadNozad) ? (state.tedadKhordSal + 1) : (state.tedadKhordSal)) : (0)
      }
      break;

    case 'COUNTER_KHORDSAL_Minus':
      // -1 to tedadKhordSal till it get 0
      return {
        ...state,
        tedadKhordSal: (state.tedadKhordSal > 0) ? (state.tedadKhordSal - 1) : (state.tedadKhordSal)
      }
      break;

    case 'COUNTER_NOZAD_PLUS':
      // tedadNozad < tedadBozorgsal
      // +1 to tedadNozad till it get 9 total persons
      return {
        ...state,
        tedadNozad: (state.tedadBozorgSal > state.tedadNozad && (state.tedadBozorgSal + state.tedadKhordSal + state.tedadNozad) < 9) && ((state.tedadBozorgSal) * 2 > state.tedadKhordSal + state.tedadNozad) ? (state.tedadNozad + 1) : (state.tedadNozad)
      }
      break;

    case 'COUNTER_NOZAD_Minus':
      // -1 to tedadNozad till it get 0
      return {
        ...state,
        tedadNozad: (state.tedadNozad > 0) ? (state.tedadNozad - 1) : (state.tedadNozad)
      }
      break;

    case 'RETURN_ENABLER_DISABLER':
      //set isReturnEnabled to true and false
      //if return gets disabled empty the returnDate value
      return {
        ...state,
        isReturnEnabled: !state.isReturnEnabled,
        returnDate: (!state.isReturnEnabled) ? (state.returnDate) : (null)
      }
      break;

    case 'SHOW_AUTO_COMPLETE':
      //hide and show autoComplete values based on "which"
      //using the zIndex to bring the selected autocomplete to front
      return {
        ...state,
        hidden1: (action.which === 1) ? (action.isHidden) : (state.hidden1),
        hidden2: (action.which === 2) ? (action.isHidden) : (state.hidden2),
        zIndex1: (which === 1) ? (2) : (3)
      }
      break;

    case 'SET_QUERY':
      return {
        ...state,
        flightTo: (action.which === 2) ? action.query : (state.flightTo),
        flightFrom: (action.which === 1) ? action.query : (state.flightFrom),
        ToCityCode: (action.which === 2) ? action.code : (state.ToCityCode),
        FromCityCode: (action.which === 1) ? action.code : (state.FromCityCode),
        toSelectedCity: (action.which === 2) ? action.selectedCity : (state.toSelectedCity),
        fromSelectedCity: (action.which === 1) ? action.selectedCity : (state.fromSelectedCity)
      }
      break;

    case 'EQUAL_INDEX':
      // set both AutoCompletes at same zIndex so both are selectable again
      return {
        ...state,
        zIndex1: 3
      }
      break;

    case 'SET_FLIGHT_DATE':
      // set flight date and return date based on which
      return {
        ...state,
        flightDate: (action.whichDate === 'a') ? (momentJ(action.date, 'jYYYY/jM/jD')) : (state.flightDate),
        returnDate: (action.whichDate === 'b') ? (momentJ(action.date, 'jYYYY/jM/jD')) : (state.returnDate)
      }
      break;

    case 'SET_REQUEST_OBJECT':
      //set requestObject exactly as webService required for later submit(converting app data to webservice required data)
      return {
        ...state,
        requestObject: {
          "from": state.FromCityCode,
          "to": state.ToCityCode,
          "way": (state.isReturnEnabled) ? ('2') : ('1'),
          "adult": state.tedadBozorgSal + "",
          "child": state.tedadKhordSal + "",
          "infant": state.tedadNozad + "",
          "fromDate": (momentJ(state.flightDate).format("jYY-jMM-jDD")),
          "toDate": (state.isReturnEnabled) ? (momentJ(state.returnDate).format("jYY-jMM-jDD")) : (null)
        }

      }
      break;

    case 'DISABLED_AND_ERROR_LOG':
      // disable/enable submit and set error log

      return {
        ...state,
        disabledSearchButton: ((!state.hidden1) || (state.FromCityCode === '')) ? (true) :
          (((!state.hidden2) || (state.ToCityCode === '')) ? (true) :
            ((state.tedadBozorgSal < 1) ? (true) :
              ((state.flightDate === null || momentJ(state.flightDate).isBefore(new Date, 'day')) ? (true) :
                ((state.isReturnEnabled) ? (
                  (state.returnDate === null) ? (true) : (
                    (
                      momentJ(state.returnDate)
                    ).isBefore(
                      momentJ(state.flightDate))
                  ) ? (
                      true) : (false)
                ) : (false)
                )
              )

            )
          ),
        //magic goes here... leveled validator and error logs for user... can use ((( error==='all is right' ))) later for verified submit
        error: ((!state.hidden1) || (state.FromCityCode === '')) ? ('شهر مبدا را انتخاب کنید') :
          (((!state.hidden2) || (state.ToCityCode === '')) ? ('شهر مقصد را انتخاب کنید') :
            ((state.tedadBozorgSal < 1) ? ('وجود حداقل یک بزرگسال اجباری است') :
              ((state.flightDate === null || momentJ(state.flightDate).isBefore(new Date, 'day')) ? ('تاریخ پرواز اشتباه است') :
                ((state.isReturnEnabled) ? (
                  (state.returnDate === null) ? ('تاریخ بازگشت انتخاب نشده است') : (
                    momentJ(state.returnDate).isBefore(
                      momentJ(state.flightDate))
                  ) ? ('تاریخ بازگشت قبل از تاریخ رفت') : ('all is right')
                ) : ('all is right')
                )
              )

            )
          )
      }
      break;

    case 'MALE_OR_FEMALE_CHECK':
      // set flight date and return date based on which
      return {
        ...state,
        isMale: !state.isMale
      }
      break;

    case 'BUYER_DETAILS_OBJECT':
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return {
        ...state,
        BuyerDetails: action.person,
        BuyerDetailsError: ((action.person.name === null) ? ('نام خریدار را وارد کنید') : (
          (action.person.family === null) ? ('لطفا نام خانوادگی خریدار را وارد کنید') : (
            ((10000000000 > action.person.mobileNo && action.person.mobileNo > 8999999999 && action.person.mobileNo.length === 11) === false) ? ('لطفا شماره موبایل را وارد کنید') : (
              ((action.person.codeMelli > 999999999 && action.person.codeMelli < 10000000000) === false) ? ('کد ملی را وارد کنید') : (
                (reg.test(action.person.eMail) === false) ? ('لطفا ایمیل صحیح را وارد کنید') : ('all is done')
              )
            )
          )
        ))
      }
      break;

    case 'PASSENGERS_DETAILS_OBJECT':

      return {
        ...state,
        passengersDetails: action.person
      }
      break;

    case 'LOGGING_IN':

      return {
        ...state,
        userName: action.loginAuth.userName,
        userPassword: action.loginAuth.password,
        loginError: (action.loginAuth.userName === '') ? ('نام کاربری را وارد کنید') : (
          (action.loginAuth.password === '') ? ('رمز عبور را وارد کنید') : ('allIsDone')
        )
      }
      break;

    case 'TOKEN_SET':

      return {
        ...state,
        token: action.token
      }
      break;

    case 'LOGIN_RESPONSE_SET':

      return {
        ...state,
        loginResponseError: (action.loginResponseItem.user) ? ('logging in...') : (
          (action.loginResponseItem[0] === 'نام کاربری <em class="placeholder"></em> فعال نشده یا مسدود شده‌ است.') ? ('نام کاربری شما در حالت تعلیق می باشد (فعال نشده یا مسدود می باشد)') : (
            (action.loginResponseItem[0] === "Wrong username or password.") ? ('نام کاربری یا رمز عبور شما اشتباه است') : (
              (action.loginResponseItem[0] === "Already logged in as appAPI.") ? ('شما قبلا وارد شده اید') : ('ارتباط برقرار نشد')
            )
          )
        ),

        token: (action.loginResponseItem.user) ? ((action.loginResponseItem.user.name === state.userName) ? (action.loginResponseItem.token) : (state.token)) : (state.token),
        sessid: (action.loginResponseItem.sessid) ? (action.loginResponseItem.sessid) : (state.sessid),
        session_name: (action.loginResponseItem.session_name) ? (action.loginResponseItem.session_name) : (state.session_name)
      }
      break;

    case 'FLIGHT_LIST_RESPONSE_SET':
      return {
        ...state,
        flightListResult: action.flightListResponse
      }
      break;

    case 'SORT_AND_FILTER_FLIGHT_LIST':


      // FILTERS

      // filter for add nonStop tick
      let tempFlightListNoneStop = state.flightListResult.filter(

        // below line means if nonStop is ticked before or is ticked now
        ((action.whichTick === "nonStop" && state.radioFilterNonStop === true) || (action.whichTick !== "nonStop" && state.radioFilterNonStop === false)) ? (
          (ourFlight) => {
            return (ourFlight.to.length !== 1);
          }
        ) : (() => true)
      )
      let tempFlightListOneStop = tempFlightListNoneStop.filter(

        // below line means if oneStop is ticked before or is ticked now
        ((action.whichTick === "oneStop" && state.radioFilterWithOneStop === true) || (action.whichTick !== "oneStop" && state.radioFilterWithOneStop === false)) ? (

          (
            (ourFlight) => {
              return (ourFlight.to.length !== 2);
            }
          )
        ) : (() => true)
      )
      let tempFlightListMoreStop = tempFlightListOneStop.filter(
        (
          // below line means if moreStop is ticked before or is ticked now
          ((action.whichTick === "moreStop" && state.radioFilterWithMoreStop === true) || (action.whichTick !== "moreStop" && state.radioFilterWithMoreStop === false)) ? (
            (
              (ourFlight) => {
                return (ourFlight.to.length <= 2);
              }
            )
          ) : (() => true))
      );

      // filter more
      let baseFilteredFlightList = [...tempFlightListMoreStop].filter(
        (ourFlight) => {
          return (ourFlight.totalPrice >= state.minPrice && ((state.maxPrice === null) || (ourFlight.totalPrice <= state.maxPrice)));
        }
      )


      // test whole filters in one top

      let classFilters = [...baseFilteredFlightList].filter(
        (ourFlight) => {


          var found = false;
          for (let i = 0; i < ourFlight.to.length; i++) {
            if (
              (
                ((action.whichTick === "classEco" && state.radioFilterClassEco === false) || (action.whichTick !== "classEco" && state.radioFilterClassEco === true)
                ) ? (
                    (ourFlight.to[i].class.toLowerCase() === 'y') || (ourFlight.to[i].class.toLowerCase() === 's')
                  ) : (false)

              ) || (

                ((action.whichTick === "classEcoDis" && state.radioFilterClassEcoDis === false) || (action.whichTick !== "classEcoDis" && state.radioFilterClassEcoDis === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'g'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'b'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'h'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'k'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'l'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'm'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'n'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'q'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 't'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'v'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'x'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classEcoPer" && state.radioFilterClassEcoPer === false) || (action.whichTick !== "classEcoPer" && state.radioFilterClassEcoPer === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'w'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classBusiness" && state.radioFilterClassBusiness === false) || (action.whichTick !== "classBusiness" && state.radioFilterClassBusiness === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'c'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'u'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classBusinessDis" && state.radioFilterClassBusinessDis === false) || (action.whichTick !== "classBusinessDis" && state.radioFilterClassBusinessDis === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'd'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'i'
                    ) || (
                      ourFlight.to[i].class.toLowerCase() === 'z'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classBusinessPer" && state.radioFilterClassBusinessPer === false) || (action.whichTick !== "classBusinessPer" && state.radioFilterClassBusinessPer === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'd'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classFirst" && state.radioFilterClassFirst === false) || (action.whichTick !== "classFirst" && state.radioFilterClassFirst === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'f'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classFirstDis" && state.radioFilterClassFirstDis === false) || (action.whichTick !== "classFirstDis" && state.radioFilterClassFirstDis === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'a'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classFirstSui" && state.radioFilterClassFirstSui === false) || (action.whichTick !== "classFirstSui" && state.radioFilterClassFirstSui === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'r'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classFirstPer" && state.radioFilterClassFirstPer === false) || (action.whichTick !== "classFirstPer" && state.radioFilterClassFirstPer === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'p'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classPer" && state.radioFilterClassPer === false) || (action.whichTick !== "classPer" && state.radioFilterClassPer === true)
                ) ? (
                    (
                      ourFlight.to[i].class.toLowerCase() === 'pe'
                    )
                  ) : (false)

              ) || (

                ((action.whichTick === "classAll" && state.radioFilterClassAll === false) || (action.whichTick !== "classAll" && state.radioFilterClassAll === true)
                ) ? (
                    true
                  ) : (false)

              )
            ) {
              found = true;
              break;
            }
          }
          return found;
        }
      )
      // whole filters in one buttom



      // read below to understand above
      // first version of filtering but it was working by removing and items... but buggy with two filters on

      // let classEcoFilteredFlights = [...baseFilteredFlightList].filter(
      //   ((action.whichTick === "classEco" && state.radioFilterClassEco === false) || (action.whichTick !== "classEco" && state.radioFilterClassEco === true)) ? (

      //     (ourFlight) => {


      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if ((ourFlight.to[i].class.toLowerCase() === 'y') || (ourFlight.to[i].class.toLowerCase() === 's')) {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classEcoDisFilteredFlights = [...classEcoFilteredFlights].filter(
      //   ((action.whichTick === "classEcoDis" && state.radioFilterClassEcoDis === false) || (action.whichTick !== "classEcoDis" && state.radioFilterClassEcoDis === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if ((
      //           ourFlight.to[i].class.toLowerCase() === 'g'
      //         ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'b'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'h'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'k'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'l'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'm'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'n'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'q'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 't'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'v'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'x'
      //           )) {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classEcoPerFilteredFlights = [...classEcoDisFilteredFlights].filter(
      //   ((action.whichTick === "classEcoPer" && state.radioFilterClassEcoPer === false) || (action.whichTick !== "classEcoPer" && state.radioFilterClassEcoPer === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if (ourFlight.to[i].class.toLowerCase() === 'w') {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classBusinessFilteredFlights = [...classEcoPerFilteredFlights].filter(
      //   ((action.whichTick === "classBusiness" && state.radioFilterClassBusiness === false) || (action.whichTick !== "classBusiness" && state.radioFilterClassBusiness === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if ((
      //           ourFlight.to[i].class.toLowerCase() === 'c'
      //         ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'u'
      //           )) {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classBusinessDisFilteredFlights = [...classBusinessFilteredFlights].filter(
      //   ((action.whichTick === "classBusinessDis" && state.radioFilterClassBusinessDis === false) || (action.whichTick !== "classBusinessDis" && state.radioFilterClassBusinessDis === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if ((
      //           ourFlight.to[i].class.toLowerCase() === 'd'
      //         ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'i'
      //           ) || (
      //             ourFlight.to[i].class.toLowerCase() === 'z'
      //           )) {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classBusinessPerFilteredFlights = [...classBusinessDisFilteredFlights].filter(
      //   ((action.whichTick === "classBusinessPer" && state.radioFilterClassBusinessPer === false) || (action.whichTick !== "classBusinessPer" && state.radioFilterClassBusinessPer === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if (ourFlight.to[i].class.toLowerCase() === 'd') {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classFirstFilteredFlights = [...classBusinessPerFilteredFlights].filter(
      //   ((action.whichTick === "classFirst" && state.radioFilterClassFirst === false) || (action.whichTick !== "classFirst" && state.radioFilterClassFirst === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if (ourFlight.to[i].class.toLowerCase() === 'f') {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classFirstDisFilteredFlights = [...classFirstFilteredFlights].filter(
      //   ((action.whichTick === "classFirstDis" && state.radioFilterClassFirstDis === false) || (action.whichTick !== "classFirstDis" && state.radioFilterClassFirstDis === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if (ourFlight.to[i].class.toLowerCase() === 'a') {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classFirstSuiFilteredFlights = [...classFirstDisFilteredFlights].filter(
      //   ((action.whichTick === "classFirstSui" && state.radioFilterClassFirstSui === false) || (action.whichTick !== "classFirstSui" && state.radioFilterClassFirstSui === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if (ourFlight.to[i].class.toLowerCase() === 'r') {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classFirstPerFilteredFlights = [...classFirstSuiFilteredFlights].filter(
      //   ((action.whichTick === "classFirstPer" && state.radioFilterClassFirstPer === false) || (action.whichTick !== "classFirstPer" && state.radioFilterClassFirstPer === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if (ourFlight.to[i].class.toLowerCase() === 'p') {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // let classPerFilteredFlights = [...classFirstPerFilteredFlights].filter(
      //   ((action.whichTick === "classPer" && state.radioFilterClassPer === false) || (action.whichTick !== "classPer" && state.radioFilterClassPer === true)) ? (
      //     (ourFlight) => {

      //       var found = false;
      //       for (let i = 0; i < ourFlight.to.length; i++) {
      //         if (ourFlight.to[i].class.toLowerCase() === 'pe') {
      //           found = true;
      //           break;
      //         }
      //       }
      //       return found;

      //     }) : (() => true))

      // end of read blow to understand above 

      let classFilteredFlights = classFilters;


      // SORTS

      let tempFlightList = ((action.whichTick === 'PriceRising' && state.radioSortByPriceRising === false) || (action.whichTick !== 'PriceRising' && action.whichTick !== 'PriceLowering' && state.radioSortByPriceRising === true)) ? (
        classFilteredFlights.sort((a, b) => {
          if (parseInt(a.totalPrice) > parseInt(b.totalPrice)) {
            return 1;
          }
          if (parseInt(a.totalPrice) < parseInt(b.totalPrice)) {
            return -1;
          }
          return 0;
        })
      ) : (
          ((action.whichTick === 'PriceLowering' && state.radioSortByPriceLowering === false) || (action.whichTick !== 'PriceLowering' && action.whichTick !== 'PriceRising' && state.radioSortByPriceLowering === true)) ? (
            classFilteredFlights.sort((a, b) => {
              if (parseInt(a.totalPrice) < parseInt(b.totalPrice)) {
                return 1;
              }
              if (parseInt(a.totalPrice) > parseInt(b.totalPrice)) {
                return -1;
              }
              return 0;
            })
          ) : (classFilteredFlights)
        )



      return {
        ...state,
        radioFilterNonStop: (action.whichTick === 'nonStop') ? !(state.radioFilterNonStop) : (state.radioFilterNonStop),
        radioFilterWithOneStop: (action.whichTick === 'oneStop') ? !(state.radioFilterWithOneStop) : (state.radioFilterWithOneStop),
        radioFilterWithMoreStop: (action.whichTick === 'moreStop') ? !(state.radioFilterWithMoreStop) : (state.radioFilterWithMoreStop),
        radioSortByPriceRising: (action.whichTick === 'PriceRising') ? !(state.radioSortByPriceRising) : (
          (action.whichTick === 'PriceLowering') ? (false) : (state.radioSortByPriceRising)
        ),
        radioSortByPriceLowering: (action.whichTick === 'PriceLowering') ? !(state.radioSortByPriceLowering) : (
          (action.whichTick === 'PriceRising') ? (false) : (state.radioSortByPriceLowering)
        ),
        radioFilterClassEco: (action.whichTick === 'classEco') ? !(state.radioFilterClassEco) : (state.radioFilterClassEco),
        radioFilterClassEcoDis: (action.whichTick === 'classEcoDis') ? !(state.radioFilterClassEcoDis) : (state.radioFilterClassEcoDis),
        radioFilterClassEcoPer: (action.whichTick === 'classEcoPer') ? !(state.radioFilterClassEcoPer) : (state.radioFilterClassEcoPer),
        radioFilterClassBusiness: (action.whichTick === 'classBusiness') ? !(state.radioFilterClassBusiness) : (state.radioFilterClassBusiness),
        radioFilterClassBusinessDis: (action.whichTick === 'classBusinessDis') ? !(state.radioFilterClassBusinessDis) : (state.radioFilterClassBusinessDis),
        radioFilterClassBusinessPer: (action.whichTick === 'classBusinessPer') ? !(state.radioFilterClassBusinessPer) : (state.radioFilterClassBusinessPer),
        radioFilterClassFirst: (action.whichTick === 'classFirst') ? !(state.radioFilterClassFirst) : (state.radioFilterClassFirst),
        radioFilterClassFirstDis: (action.whichTick === 'classFirstDis') ? !(state.radioFilterClassFirstDis) : (state.radioFilterClassFirstDis),
        radioFilterClassFirstSui: (action.whichTick === 'classFirstSui') ? !(state.radioFilterClassFirstSui) : (state.radioFilterClassFirstSui),
        radioFilterClassFirstPer: (action.whichTick === 'classFirstPer') ? !(state.radioFilterClassFirstPer) : (state.radioFilterClassFirstPer),
        radioFilterClassPer: (action.whichTick === 'classPer') ? !(state.radioFilterClassPer) : (state.radioFilterClassPer),
        radioFilterClassAll: (action.whichTick === 'classAll') ? !(state.radioFilterClassAll) : (state.radioFilterClassAll),
        flightList: tempFlightList
      }
      break;


    case 'SET_SELECTED_FLIGHT':
      return {
        ...state,
        selectedFlight: action.data
      }
      break;

    case 'SET_PRICE_RANGE':


      return {
        ...state,
        minPrice: action.value[0],
        maxPrice: action.value[1]
      }
      break;

    case 'SET_WHICH_SCREEN':

      return {
        ...state,
        whichScreen: action.screen
      }
      break;

    case 'SWITCH_FLIGHTS':

      return {
        ...state,
        flightFrom: state.flightTo,
        flightTo: state.flightFrom,
        ToCityCode: state.FromCityCode,
        FromCityCode: state.ToCityCode,
        toSelectedCity: state.fromSelectedCity,
        fromSelectedCity: state.toSelectedCity
      }
      break;

    case 'SET_RESERVE_JSON':

      return {
        ...state,
        resrveResult: action.reserveJson
      }
      break;

    default:
      return state;
      break;
  }
  return state;
}
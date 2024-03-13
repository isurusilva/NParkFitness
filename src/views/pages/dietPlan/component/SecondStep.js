import React, { useEffect, useState } from 'react';
import { Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DietPlanSuggestionCard from './DietPlanSuggestionCard';
import { Grid } from '@mui/material';
import axios from 'axios';
import { Store } from 'react-notifications-component';
import Lottie from 'react-lottie';
import * as success from 'assets/images/loading.json';
import messages from 'utils/messages';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const SecondStep = ({
    mealType,
    setMealType,
    portionType,
    setPortionType,
    items,
    setItems,
    amount,
    setAmount,
    dietPlanData,
    selectedFoodData,
    setSelectedFoodData,
    handleNext
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const [extrafoodData, setExtraFoodData] = useState([]);
    const [finalFoodData, setFinalFoodData] = useState([]);
    const [sugestionArr, setSugestionArr] = useState([]);

    console.log(mealType);
    console.log(items);
    console.log(amount);
    console.log(dietPlanData);
    const searchText = [...items];
    const data = [
        {
            foodName: 'Carrot',
            amount: 35,
            calAmount: 13.6
        },
        {
            foodName: 'Tomato',
            amount: 45,
            calAmount: 8.2
        },
        {
            foodName: 'Apple',
            amount: 35,
            calAmount: 18.5
        }
    ];

    const calorieInstance = axios.create({
        baseURL: 'https://api.calorieninjas.com/v1',
        timeout: 10000,
        headers: { 'X-Api-Key': '6RwQbquEzm9YBP6n/M5AVA==Nv6Oh56eUK2Oc1lv' }
    });

    function getRndInteger(max) {
        return Math.floor(Math.random() * (max - 1));
    }

    async function findCalorie(search, type) {
        console.log(search);
        const temp = [];
        let foodText = '';
        await Promise.all(
            search.map((element) => {
                if (element.foodItem !== undefined) {
                    foodText = foodText.concat(element.foodItem, ', ');
                } else {
                    foodText = foodText.concat(element.amount, ' g ', element.name, ', ');
                }
                return 0;
            })
        );
        console.log(foodText);

        calorieInstance.get(`/nutrition?query=${foodText}`).then(async (response) => {
            console.log(response.data);
            if (response.data.items.length === 0) {
                // messages.addMessage({ title: 'Error Occured!', msg: 'Enter Foods Cannot Find', type: 'danger' });
                // setIsLoading(false);
            } else {
                await Promise.all(
                    response.data.items.map((element) => {
                        temp.push({
                            name: element.name,
                            amount: element.serving_size_g,
                            calorie: element.calories
                        });
                        return 0;
                    })
                );
                if (type === 'final') {
                    // console.log(extrafoodData);
                    // const foodIndex = getRndInteger(extrafoodData.length);
                    // // const foodIndex = Math.floor(Math.random() * (extrafoodData.length - 1));
                    // console.log('foodIndexFinal');
                    // console.log(foodIndex);
                    // console.log(extrafoodData[foodIndex]);
                    // temp.push({
                    //     name: extrafoodData[foodIndex].foodName,
                    //     amount: extrafoodData[foodIndex].amount,
                    //     calorie: extrafoodData[foodIndex].calAmount
                    // });
                    setFinalFoodData(temp);
                    setIsLoading(false);

                    console.log('Final');
                    console.log(temp);
                } else {
                    setFoodData(temp);
                }
                // setIsLoading(false);
            }
            return temp;
        });
    }

    async function createDietSuggestion(foods) {
        console.log(amount);
        console.log(foods.length);
        const tempFoodData = [];
        const avgFoodCalorie = Math.round(amount / foods.length);
        let portionPointer = 1;
        let result = '';

        // let foodText = '';
        await Promise.all(
            foods.map(async (element, index) => {
                if (index < items.length) {
                    result = items[index].portionType;
                }
                console.log(result);
                if (result === 'Low') {
                    portionPointer = 0.3;
                } else if (result === 'Medium') {
                    portionPointer = 0.6;
                }
                console.log('result2');

                const foodAmount = Math.round((100 / element.calorie) * avgFoodCalorie * ((portionPointer * (getRndInteger(5) + 5)) / 10));
                console.log(avgFoodCalorie);
                console.log(foodAmount);
                const data = {
                    name: element.name,
                    amount: foodAmount < 30 ? 40 : foodAmount
                };
                tempFoodData.push(data);
                // foodText = foodText.concat(data.amount, 'g ', data.name, ' ');
                return 0;
            })
        );
        findCalorie(tempFoodData, 'final');
        // setFinalFoodData(tempFoodData);
    }

    async function analizeDietData() {
        setIsLoading(true);
        findCalorie(searchText, 'temp');
    }

    useEffect(async () => {
        const tempExtraFoodArr = [];
        await Promise.all(
            dietPlanData.map(async (element, index) => {
                if (element.mealItemData.length > 0) {
                    const foodIndex = getRndInteger(element.mealItemData.length);
                    console.log('foodIndex');
                    console.log(foodIndex);
                    console.log(element.mealItemData[foodIndex]);
                    tempExtraFoodArr.push(element.mealItemData[foodIndex]);
                }
            })
        );
        console.log(tempExtraFoodArr);
        setExtraFoodData(tempExtraFoodArr);
        analizeDietData();
    }, [items]);

    useEffect(async () => {
        createDietSuggestion(foodData);
    }, [foodData]);

    useEffect(async () => {
        let count = 0;
        console.log(extrafoodData);
        const tempArr = [];
        if (finalFoodData.length > 0) {
            while (count < 3) {
                const tempFinalFoodData = [...finalFoodData];

                // if (count > finalFoodData.length - 1) {
                //     tempFinalFoodData.push(finalFoodData[finalFoodData.length - 1]);
                // } else {
                //     tempFinalFoodData.push(finalFoodData[count]);
                // }
                const foodIndex = getRndInteger(extrafoodData.length);
                console.log('foodIndexFinal');
                console.log(foodIndex);
                console.log(extrafoodData[foodIndex]);
                console.log(tempFinalFoodData);
                if (extrafoodData.length > 2) {
                    tempFinalFoodData.push({
                        name: extrafoodData[count].foodName,
                        amount: extrafoodData[count].amount,
                        calorie: extrafoodData[count].calAmount
                    });
                } else {
                    tempFinalFoodData.push({
                        name: data[count].foodName,
                        amount: data[count].amount,
                        calorie: data[count].calAmount
                    });
                }

                tempArr.push(tempFinalFoodData);
                count += 1;
            }
            setSugestionArr(tempArr);
            setIsLoading(false);
        }

        console.log(tempArr);
    }, [finalFoodData]);

    const hansleSelect = () => {
        console.log('Hello');
    };

    return (
        <>
            {isLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '500px',
                        width: '100%'
                    }}
                >
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            ) : (
                <>
                    <div>
                        <Grid container alignItems="center" justifyContent="center" spacing={2}>
                            <div style={{ hight: 10 }} />
                            {sugestionArr.length > 0 ? (
                                <>
                                    {sugestionArr.map((element) => (
                                        <Grid item sm={12} xs={12} md={6} lg={4}>
                                            <DietPlanSuggestionCard
                                                dietPlanSuggestionData={element}
                                                setSelectedFoodData={setSelectedFoodData}
                                                handleNext={handleNext}
                                            />
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                <></>
                            )}
                            {/* {sugestionArr.map((element) => (
                                <Grid item sm={12} xs={12} md={6} lg={4}>
                                    <DietPlanSuggestionCard dietPlanSuggestionData={element} setSelectedFoodData={setSelectedFoodData} />
                                </Grid>
                            ))} */}
                            {/* <Grid item sm={12} xs={12} md={6} lg={4}>
                                <DietPlanSuggestionCard dietPlanSuggestionData={finalFoodData} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={4}>
                                <DietPlanSuggestionCard dietPlanSuggestionData={finalFoodData} />
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={4}>
                                <DietPlanSuggestionCard dietPlanSuggestionData={finalFoodData} />
                            </Grid> */}
                        </Grid>
                    </div>
                </>
            )}
        </>
    );
};

export default SecondStep;

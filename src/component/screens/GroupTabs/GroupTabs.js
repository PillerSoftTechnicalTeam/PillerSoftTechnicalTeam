import React, { Component, createRef, useRef } from 'react'
import { Text, View, Dimensions, FlatList, SafeAreaView, RefreshControl, ScrollView } from 'react-native'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Content } from 'native-base';
import TitleHeader from '../../Common/TitleHeader';
import GroupHeader from '../../Common/GroupHeader';
import RecentActivity from '../RecentActivity';
import GroupSuggestions from '../GroupSuggestions';
import MyGroupScreen from '../MyGroupScreen';
import DiscoverScreen from '../DiscoverScreen';
import JoinedGroups from '../JoinedGroups';
import SearchModal from '../../Modal/SearchModal';
import Loading from '../../Common/Loader';
import Button from '../../../component/Common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');

export default class GroupsTab extends Component {


    constructor(props) {
        super(props)
        this.flatListRef = createRef()
        this.state = {
            data: [
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },
                { image: require('../../../resources/images/ic_car.png'), price: '$50000' },

            ],
            buttonData: [{ title: 'Recent Activity', tab: true }, { title: 'Group Suggestion', tab: false }, { title: 'Your Group', tab: false }, { title: 'Discover', tab: false }, { title: 'Joined Group', tab: false }],
            selectedTab: 0,
            searchModal: false

        }
    }


    onPressTab = (index) => {
        console.log(index)
        let data = [...this.state.buttonData];
        for (let i in data) {
            data[i].tab = false
        }
        data[index].tab = true
        this.setState({ selectedTab: index })
        this.setState({ buttonData: data })
    }
    onSelectedTab = (index) => {
        console.log("In TAB Fn", index)
        switch (index) {
            case 0:
                return (
                    <RecentActivity />
                )

                break;
            case 1:
                return (
                    <GroupSuggestions
                        discoverTab={() => this.onPressTab(3)}
                    />
                )
                break;
            case 2:

                return (
                    <MyGroupScreen
                        navigation={this.props.navigation}
                    />
                )
                break;
            case 3:

                return (
                    <DiscoverScreen />
                )
                break;
            case 4:

                return (
                    <JoinedGroups
                        navigation={this.props.navigation}
                    />
                )

                break;
        }
    }


    renderTab = ({ item, index }) => {
        return (
            <GroupHeader
                title={item.title}
                onPress={() => this.onPressTab(index)}
                customStyle={[{ width: 125, height: 30, backgroundColor: item.tab ? '#530D89' : '#CEBFDA', borderRadius: 5, marginStart: 4 }]}
                titleStyle={{ fontSize: 18 }}
            // isSelected={item.isSelected}
            />
        )
    }



    render() {
        const {searchModal,buttonData, changeTab } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F5F8' }}>
                {/* <Loading loading={this.state.isLoading} loaderColor={'white'} /> */}

                {
                    searchModal &&
                    <SearchModal
                        onChangeSearch={(text) => this.onChangeSearch(text)}
                        dismissModalCallback={() => this.setState({ searchModal: false })}
                        customStyle={{ marginTop: width / 3.94 }} />
                }


                <TitleHeader title={false} title={'GROUPS'} tapOnBack={() => this.props.navigation.goBack()}
                    tapOnEdit={() => this.props.navigation.navigate('EditInfoScreen')}
                    isGroups={true}
                    // tapOnSetting={() => this.setState({ showModal: true })}
                    tapOnSearch={() => this.setState({ searchModal: true })}
                    tapOnAdd={() => this.props.navigation.navigate('CreateGroupScreen')}
                    customTitleStyle={{ marginStart: 22, width: width / 3.59, }}
                    customHeaderStyle={{ width: width / 2.6, }}

                />

                <View style={{ marginStart: 8, marginEnd: 8 }}>

                    <View style={{ flexDirection: 'row' }}>

                        <FlatList
                            ref={this.flatListRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={buttonData}
                            renderItem={this.renderTab}
                            keyExtractor={item => item.id}
                        />

                    </View>

                    {this.onSelectedTab(this.state.selectedTab)}

                </View>

                {/* </Content> */}
            </SafeAreaView>
        );
    }
}


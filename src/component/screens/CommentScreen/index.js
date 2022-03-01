import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Loading from '../../Common/Loader';
import TitleHeader from '../../Common/TitleHeader';

import AsyncStorage from '@react-native-async-storage/async-storage';
const { height, width } = Dimensions.get('window');
import AppConstants from '../../../constants/AppConstants';
import GLOBAL from '../../../constants/ApiConstants';

class CommentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            comment: null,
            showCommentBox: false,
            loading: false,
            userHash: '', commentList: [],
            userDetails: ''
        };
    }

    componentDidMount() {
        const { id } = this.props.route.params

        AsyncStorage.getItem(AppConstants.USER_DETAILS).then(user_details => {
            if (user_details) {
                let data = JSON.parse(user_details)
                this.setState({ userDetails: data }, () => {
                    this.getCommentData(id)
                })
            }
        });
    }

    getCommentData = (id) => {
        this.setState({ loading: true })
        let url = GLOBAL.BASE_URL + 'api/CommonAPI/GetComments?postid=' + id
        console.log('postDta url-->>', JSON.stringify(url))

        // fetch(GLOBAL.BASE_URL + '/api/CommonAPI/GetComments',
        fetch(url,

            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                //     postId: id
                // })
            }).then((response) => response.json())
            .then((respData) => {
                console.log('postDta respDatarespData-->>', JSON.stringify(respData))

                this.setState({ loading: false, commentList: [...this.state.commentList, ...respData.response] }, () => {
                    console.log('postDta-->>', JSON.stringify(this.state.commentList))
                });
            }).catch((error) => {
                this.setState({ loading: false })
                console.log(error);
            });
    }

    tapOnSend = (comment) => {
        this.props.tapOnSend(comment)
    }

    onChangeComment = (text) => {
        this.setState({ comment: text })
    }


    postCommentData = (id, comment) => {
        if (comment == '' || comment == null) {
            alert('Please fill the comment')
            return;
        }
        this.setState({ loading: true })

        fetch(GLOBAL.BASE_URL + '/api/CommonAPI/PostComment', {
            // fetch(GLOBAL.BASE_URL + '/api/CommonAPI/PostComment'+'postid='+id, {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PostId: this.props.route.params.id,
                ReviewText: comment,
                ReviewBy: this.state.userDetails.Id,

            })
        }).then((responsedata) => responsedata.json()
        ).then((responsedata) => {
            if (responsedata.response.StatusCode == 1) {
                // console.log('body postCommentData-->>', JSON.stringify(body));

                console.log('comment posted');
                var date = new Date().getDate();
                var data = {
                    PostId: id,
                    ReviewOn: date,
                    ReviewText: comment,
                    ProfileImage: this.state.userDetails.UserImage,
                    UserName: this.state.userDetails.Username
                }
                console.log(data);
                console.log(this.state.commentList);
                this.setState({
                    loading: false,
                    commentList: [...this.state.commentList, data]
                });
                this.setState({ ReviewsCount: this.state.commentList.length })
                //this.setState({commentsListFromServer : [...this.commentsListFromServer, ...data]}); 
                this.handlePostedComment('');

            }
        }).catch((error) => {
            console.log(error);
        });
    }

    handlePostedComment = (text) => {
        this.setState({ commentPosted: text });

    }

    goBack = () => {
        this.props.route.params.goBack()
        this.props.navigation.goBack();
    }

    render() {
        const { id } = this.props.route.params
        const { commentList, userDetails } = this.state;


        return (
            <SafeAreaView style={styles.container}>
                <Loading loading={this.state.loading} loaderColor={'black'} />
                <TitleHeader title={true} title={'COMMENT SCREEN'} tapOnBack={() => this.goBack()} />

                <View style={[styles.commentBox, { width: width / 1.09 }]}>
                    {/* <User width={50} height={50} /> */}
                    <Image style={{ height: 24, width: 24 }} source={{ uri:userDetails.UserImage?'http://staging.godconnect.online/UploadedImages/ProfileImages'+userDetails.UserImage: 'https://godconnect.online/UploadedImages/ProfileImages/dummy.png'  }} />
                    <View style={[styles.inputContainerStyle, {
                        //   height: width / 2.3,
                        //   width: width / 1.09,
                        borderRadius: 15,
                        padding: 12,
                        flexDirection: 'row',
                        //   alignItems: 'flex-start',
                        elevation: 5, shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        backgroundColor: 'white',
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                        width: width / 1.4
                    }]}>
                        <TextInput
                            placeholder={'Write a comment...'}
                            style={styles.input}
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => this.onChangeComment(text)}
                            value={this.state.comment} />
                        <TouchableOpacity style={[styles.inputHelperIconContainer, { flexDirection: 'row' }]}
                            onPress={() => this.postCommentData(id, this.state.comment)}>
                            {/* <Ionicons
                style={{marginLeft: 10}}
                name={'ios-camera-outline'}
                size={17}
                color={Colors.black}
              /> */}
                            <Image style={{ height: 20, width: 20 }} source={require('../../../resources/images/save.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                {commentList.map((item, index) => {
                    console.log('item in comment-->>', JSON.stringify(item))

                    return (
                        <View key={index.toString()} style={{}}>

                            <View style={styles.commentWrapper}>
                                {/* <User width={50} height={50} />
                                 */}
                                <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://godconnect.online/UploadedImages/ProfileImages/' + item.ProfileImage }} />

                                <View>
                                    <View style={styles.comment}>
                                        <Text style={styles.user}>{item.UserName}</Text>
                                        <Text style={styles.commentText}>
                                            {item.ReviewText}
                                        </Text>
                                    </View>
                                    {/* <View style={{ flexDirection: 'row' }}> */}
                                    {/* <Text style={styles.like}>Like</Text> */}
                                    {/* <TouchableOpacity onPress={()=>this.setState({showCommentBox:true})}>
                <Text style={[styles.like, { marginLeft: 10 }]}>Reply</Text>
              </TouchableOpacity> */}
                                    {/* </View> */}
                                </View>
                            </View>


                        </View>
                    );
                })}




            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    commentWrapper: {
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 6, alignSelf: 'center'
    },
    comment: {
        width: 342,
        height: 46,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        padding: 8, marginStart: 10
    },
    user: {
        fontSize: 9,
        color: 'black',
        fontWeight: 'bold',
    },
    commentText: {
        fontSize: 7,
        color: 'black',
        lineHeight: 12,
    },
    like: {
        fontSize: 10,
        // color: Colors.primary,
    },
    commentBox: {
        width: 382,
        height: 60,
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
    },
    inputContainerStyle: {
        flexDirection: 'row',
        width: 340,
        height: 46,
        borderRadius: 50,
        backgroundColor: 'red',
        borderBottomWidth: 0,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center', marginStart: 8
    },
    input: {
        width: '95%',
        height: 46,
        fontSize: 10,
        color: 'gray',
    },
    inputHelperIconContainer: {
        width: '10%',
    },
});
CommentScreen.propTypes = {};

export default CommentScreen;

import React from 'react';
//import { StyleSheet, Text, View, Button } from 'react-native';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome5 } from "@expo/vector-icons";
import MusicPlayer from './MusicPlayer';
import Moment from "moment";
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { list } from './list';

export default class App extends React.Component {

    MusicPlayer = null;

    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            name: null,
            trackLength: 0,
            timeElapsed: "0:00",
            timeRemaining: "5:00"
        };
    }

   

    changeTime = seconds => {
        this.setState({ timeElapsed: Moment.utc(seconds * 1000).format("m:ss") });
        this.setState({ timeRemaining: Moment.utc((this.state.trackLength - seconds) * 1000).format("m:ss") });
    };


    componentWillMount() {
        this.MusicPlayer = new MusicPlayer(list);
    }

    startStopPlay = () => {
        this.MusicPlayer.startPlay(0, this.state.playing).then(() => {
            this.setState({
                playing: !this.state.playing
            })
        });
    };

    playNext = () => {
        this.MusicPlayer.playNext().then(() => {
            this.setState({
                name: this.MusicPlayer.getCurrentItemName()
            });
        })
    };

    playPrev = () => {
        this.MusicPlayer.playPrev().then(() => {
            this.setState({
                name: this.MusicPlayer.getCurrentItemName()
            });
        })
    };

    render() {
        return (
            // <View style={styles.container}>
            //     <Text>{this.state.name || this.MusicPlayer.getCurrentItemName()}</Text>
            //     <Button title={this.state.playing ? 'Stop' : 'Play'} onPress={this.startStopPlay}/>
            //     <Button title='Next' onPress={this.playNext}>Next</Button>
            //     <Button title='Prev' onPress={this.playPrev}>Prev</Button>
            //     <Button title='Up' onPress={() => this.MusicPlayer.setSpeed(2.5)}/>
            //     <Button title='Down' onPress={() => this.MusicPlayer.setSpeed(0.6)}/>
            // </View>
            <SafeAreaView style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <View style={{ alignItems: "center", marginTop: 24 }}>
                    <Text style={[styles.textLight, { fontSize: 12 }]}>PLAYLIST</Text>
                    <Text style={[styles.text, { fontSize: 15, fontWeight: "500", marginTop: 8 }]}>
                        Mental Health Sessions
                    </Text>
                </View>

                <View style={styles.coverContainer}>
                    <Image source={require("./assets/img.jpg")} style={styles.cover}></Image>
                </View>

                <View style={{ alignItems: "center", marginTop: 32 }}>
                    <Text style={[styles.textDark, { fontSize: 20, fontWeight: "500" }]}>{this.state.name || this.MusicPlayer.getCurrentItemName()}</Text>
                </View>
            </View>

            <View style={{ margin: 32 }}>
                <Slider
                    minimumValue={0}
                    maximumValue={1}
                    trackStyle={styles.track}
                    //thumbStyle={styles.thumb}
                    minimumTrackTintColor="#000000"
                    onValueChange={seconds => this.changeTime(seconds)}
                    //minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#93A8B3"
                ></Slider>
                <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={[styles.textLight, styles.timeStamp]}>{this.state.timeElapsed}</Text>
                    <Text style={[styles.textLight, styles.timeStamp]}>{this.state.timeRemaining}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 16 }}>
                <TouchableOpacity>
                    <FontAwesome5 name="backward" onPress={this.playPrev} size={32} color="#93A8B3"></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButtonContainer}>
                    <FontAwesome5
                        name="play"
                        size={32}
                        color="#3D425C"
                        onPress={this.startStopPlay}
                        style={[styles.playButton, { marginLeft: 8 }]}
                    ></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome5 name="forward" size={32} onPress={this.playNext} color="#93A8B3"></FontAwesome5>
                </TouchableOpacity>
            </View >
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 16 }}>

            <TouchableOpacity>
                <MaterialCommunityIcons name="speedometer-slow" size={40} color="#93A8B3" onPress={() => this.MusicPlayer.setSpeed(0.5)} />
                <Text style={{marginLeft:8}}>0.5x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:50}}>
                    <MaterialCommunityIcons name="speedometer-medium" size={40} onPress={() => this.MusicPlayer.setSpeed(1)} color="#93A8B3"></MaterialCommunityIcons>
                    <Text style={{marginLeft:8}}>1.0x</Text>
                </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:50}}>
                    <MaterialCommunityIcons name="speedometer" size={40} onPress={() => this.MusicPlayer.setSpeed(2.5)} color="#93A8B3"></MaterialCommunityIcons>
                    <Text style={{marginLeft:8}}>2.5x</Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAEAEC"
    },
    textLight: {
        color: "#B6B7BF"
    },
    text: {
        color: "#8E97A6"
    },
    textDark: {
        color: "#3D425C"
    },
    coverContainer: {
        marginTop: 32,
        width: 250,
        height: 250,
        shadowColor: "#5D3F6A",
        shadowOffset: { height: 15 },
        shadowRadius: 8,
        shadowOpacity: 0.3
    },
    cover: {
        width: 250,
        height: 250,
        borderRadius: 125
    },
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: "#FFF"
    },
    thumb: {
        width: 8,
        height: 8,
        backgroundColor: "#3D425C"
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: "500"
    },
    playButtonContainer: {
        backgroundColor: "#FFF",
        borderColor: "rgba(93, 63, 106, 0.2)",
        borderWidth: 16,
        width: 128,
        height: 128,
        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
        shadowColor: "#5D3F6A",
        shadowRadius: 30,
        shadowOpacity: 0.5
    }
});
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import commentHandler from "../../../utils/commentHandler";
import styles from "./Comment.style";
import Auth from "../../../utils/auth";
import { COLORS } from "../../../constants";

function Comments({ data }) {
    const { navigation, jobDetails, categories, user, jobId, setChangesMade } = data;

    const [commentContent, setCommentContent] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    const handleChange = (value) => {
        setCommentContent(value);
    };

    const addComment = async () => {
        const body = {
            userId: user.id,
            content: commentContent,
            profilePic: user.profilePic,
        };

        await commentHandler.addComment(jobId, body);
        setChangesMade(true);
        setCommentContent("");
    };

    const deleteComment = async (commentId) => {
        await commentHandler.deleteComment(jobId, commentId);
        setChangesMade(true);
    };

    function formatCommentDate(commentDateArray) {
        if (Array.isArray(commentDateArray) && commentDateArray.length === 5) {
            const [year, month, day, hours, minutes] = commentDateArray;
            let amOrPm = "AM";
            let formattedHours = hours;

            if (hours >= 12) {
                amOrPm = "PM";
                if (hours > 12) {
                    formattedHours = hours - 12;
                }
            }

            const formattedDate = `${month}/${day}/${year}, ${formattedHours}:${minutes} ${amOrPm}`;
            return formattedDate;
        }
        return "Invalid Date";
    }

  
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 8, color: "white" }}>Contrcator Remarks</Text>
            {jobDetails?.comments.map((comment) => (
                <View key={comment.id} style={styles.commentContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={{ uri: comment.profilePic }}
                                style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
                            />
                            <Text>{comment.username}</Text>
                        </View>
                        <View>
                            {user.id === comment.userId ? (
                                <View style={{ alignItems: "flex-end" }}>
                                    <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                                        <FontAwesomeIcon icon={faTrash} size={20} style={{ color: "black" }} />
                                    </TouchableOpacity>
                                    <Text>{formatCommentDate(comment.commentDate)}</Text>
                                </View>
                            ) : (
                                <Text>{formatCommentDate(comment.commentDate)}</Text>
                            )}
                        </View>
                    </View>
                    <Text>{comment.content}</Text>
                </View>
            ))}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                <TextInput
                    style={[
                        styles.inputContainer,
                        isInputFocused ? styles.centeredInput : null,
                    ]}
                    value={commentContent}
                    onChangeText={handleChange}
                    onFocus={() => { this.centeredInput, handleFocus()}}
                    onBlur={handleBlur}
                    maxLength={15383}
                    placeholder="Leave a Comment"
                    placeholderTextColor={"white"}
                />
                <TouchableOpacity onPress={() => setCommentContent("")} style={{ marginLeft: 8 }}>
                    <Text style={{ color: COLORS.primary }}>X</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={addComment}>
                <Text style={{ color: "white" }}>Submit Comment</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Comments;

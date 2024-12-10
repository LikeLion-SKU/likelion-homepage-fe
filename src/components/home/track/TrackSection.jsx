import React from "react";
import styles from "./TrackSection.module.css"
import SectionWrapper from "../commons/SectionWrapper";
import Track from "./Track";

export default function TrackSection() {

    return (
        <SectionWrapper>
            <p className={styles.title}>트랙 소개</p>
            <Track>
                <Track.Manager />
                <Track.Designer />
                <Track.Frontend />
                <Track.Backend />
            </Track>
        </SectionWrapper>
    )
}
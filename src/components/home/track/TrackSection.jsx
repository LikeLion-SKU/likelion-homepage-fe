import React from "react";
import SectionWrapper from "../commons/SectionWrapper";
import Track from "./Track";

export default function TrackSection() {

    return (
        <SectionWrapper>
            <Track.Title />
            <Track>
                <Track.Manager />
                <Track.Designer />
                <Track.Frontend />
                <Track.Backend />
            </Track>
        </SectionWrapper>
    )
}
import { hf } from "./hf.js";

const prefix = `
# Consider available components:
# components:
#   parameters:asset_id,broadcast_id,delivery_usage_asset_id,delivery_usage_limit,delivery_usage_live_stream_id,delivery_usage_timeframe,dimension,dimension_id,error_id,filter_id,filters,group_by,incident_id,incident_status,limit,list_asset_live_stream_id,list_asset_upload_id,livestream_id,measurement,metric_id,monitoring_dimension,monitoring_filters,monitoring_histogram_metric_id,monitoring_metric_id,monitoring_timeseries_limit,monitoring_timeseries_timeframe,monitoring_timeseries_timestamp,order_by,order_direction,order_direction_deprecated,page,playback_id,playback_restriction_id,realtime_dimension,realtime_histogram_metric_id,realtime_metric_id,severity,signing_key_id,simulcast_target_id,space_id,stream_key,timeframe,timeseries_group_by,timestamp,track_id,transcription_vocabulary_id,upload_id,value,video_view_id,viewer_id
#   schemas:AbridgedVideoView,Asset,AssetGeneratedSubtitleSettings,AssetResponse,BreakdownValue,Broadcast,BroadcastLayout,BroadcastResolution,BroadcastResponse,BroadcastStatus,CreateAssetRequest,CreateBroadcastRequest,CreateLiveStreamRequest,CreatePlaybackIDRequest,CreatePlaybackIDResponse,CreatePlaybackRestrictionRequest,CreateSimulcastTargetRequest,CreateSpaceRequest,CreateTrackRequest,CreateTrackResponse,CreateTranscriptionVocabularyRequest,CreateUploadRequest,DeliveryReport,DimensionValue,DisableLiveStreamResponse,EnableLiveStreamResponse,Error,ExportDate,ExportFile,FilterValue,GetAssetInputInfoResponse,GetAssetOrLiveStreamIdResponse,GetAssetPlaybackIDResponse,GetLiveStreamPlaybackIDResponse,GetMetricTimeseriesDataResponse,GetMonitoringBreakdownResponse,GetMonitoringBreakdownTimeseriesResponse,GetMonitoringHistogramTimeseriesResponse,GetMonitoringTimeseriesResponse,GetOverallValuesResponse,GetRealTimeBreakdownResponse,GetRealTimeHistogramTimeseriesResponse,GetRealTimeTimeseriesResponse,Incident,IncidentBreakdown,IncidentNotification,IncidentNotificationRule,IncidentResponse,InputFile,InputInfo,InputSettings,InputTrack,Insight,ListAllMetricValuesResponse,ListAssetsResponse,ListBreakdownValuesResponse,ListDeliveryUsageResponse,ListDimensionValuesResponse,ListDimensionsResponse,ListErrorsResponse,ListExportsResponse,ListFilterValuesResponse,ListFiltersResponse,ListIncidentsResponse,ListInsightsResponse,ListLiveStreamsResponse,ListMonitoringDimensionsResponse,ListMonitoringMetricsResponse,ListPlaybackRestrictionsResponse,ListRealTimeDimensionsResponse,ListRealTimeMetricsResponse,ListRelatedIncidentsResponse,ListSigningKeysResponse,ListSpacesResponse,ListTranscriptionVocabulariesResponse,ListUploadsResponse,ListVideoViewExportsResponse,ListVideoViewsResponse,LiveStream,LiveStreamEmbeddedSubtitleSettings,LiveStreamGeneratedSubtitleSettings,LiveStreamResponse,LiveStreamStatus,MaxContinuousDuration,Metric,MonitoringBreakdownTimeseriesDatapoint,MonitoringBreakdownTimeseriesValues,MonitoringBreakdownValue,MonitoringHistogramTimeseriesBucket,MonitoringHistogramTimeseriesBucketValues,MonitoringHistogramTimeseriesDatapoint,MonitoringTimeseriesDatapoint,NotificationRule,OverallValues,PlaybackID,PlaybackPolicy,PlaybackRestriction,PlaybackRestrictionResponse,RealTimeBreakdownValue,RealTimeHistogramTimeseriesBucket,RealTimeHistogramTimeseriesBucketValues,RealTimeHistogramTimeseriesDatapoint,RealTimeTimeseriesDatapoint,ReferrerDomainRestriction,Score,SignalLiveStreamCompleteResponse,SigningKey,SigningKeyResponse,SimulcastTarget,SimulcastTargetResponse,Space,SpaceResponse,SpaceStatus,SpaceType,StartSpaceBroadcastResponse,StopSpaceBroadcastResponse,Track,TranscriptionVocabulary,TranscriptionVocabularyPhrase,TranscriptionVocabularyResponse,UpdateAssetMP4SupportRequest,UpdateAssetMasterAccessRequest,UpdateAssetRequest,UpdateLiveStreamEmbeddedSubtitlesRequest,UpdateLiveStreamGeneratedSubtitlesRequest,UpdateLiveStreamRequest,UpdateReferrerDomainRestrictionRequest,UpdateTranscriptionVocabularyRequest,Upload,UploadResponse,VideoView,VideoViewEvent,VideoViewResponse
#   securitySchemes:accessToken
operationId: create-url-signing-key
responses:
  "201":
    content:
      application/json:
        example:
          data:
            created_at: "1610108345"
            id: vI5KTQ78ohYriuvWKHY6COtZWXexHGLllxksOdZuya8
            private_key: abcd123=
        schema:
          $ref: "#/components/schemas/SigningKeyResponse"
    description: Created
summary: Create a URL signing key
tags:
  - URL Signing Keys
"/video/v1/signing-keys/{SIGNING_KEY_ID}":
delete:
deprecated: true
description: |
  This route is now deprecated, please use the \`Signing Keys\` API. Deletes an existing signing key. Use with caution, as this will
  invalidate any existing signatures and no URLs can be signed using the key
  again.

  Note: Any new access tokens authenticating this route will be required to have \`System\` level permissions.
operationId: delete-url-signing-key
parameters:
  - $ref: "#/components/parameters/signing_key_id"
responses:
  "204":
    description: No Content
summary: Delete a URL signing key
tags:
  - URL Signing Keys
get:
deprecated: true
description: |
  This route is now deprecated, please use the \`Signing Keys\` API. Retrieves the details of a URL signing key that has previously
  been created. Supply the unique signing key ID that was returned from your
  previous request, and Mux will return the corresponding signing key information.
  **The private key is not returned in this response.**

  Note: Any new access tokens authenticating this route will be required to have \`System\` level permissions.
operationId: get-url-signing-key
parameters:
  - $ref: "#/components/parameters/signing_key_id"
responses:
  "200":
    content:
      application/json:
        example:
          data:
            created_at: "1608632647"
            id: jc6lJiCLMjyC202EXtRQ644sShzDv6x5tWJrbvUFpvmo
        schema:
          $ref: "#/components/schemas/SigningKeyResponse"
    description: OK
summary: Retrieve a URL signing key
tags:
  - URL Signing Keys
/video/v1/spaces:
get:
deprecated: true
description: List all spaces in the current enviroment.
operationId: list-spaces
parameters:
  - $ref: "#/components/parameters/limit"
  - $ref: "#/components/parameters/page"
responses:
  "200":
    content:
      application/json:
        example:
          data:
            - created_at: "1607452572"
              id: uylLl3WuQ54CwqUB9UHySxnN66sqKue5
              status: idle
              type: server
            - created_at: "1693452572"
              id: HK01Bq7FrEQmIu3QpRiZZ98HQOOZjm6B
              status: active
              type: server
        schema:
          $ref: "#/components/schemas/ListSpacesResponse"
    description: OK
summary: List spaces
tags:
  - Spaces
post:
deprecated: true
description: Create a new space. Spaces are used to build [real-time video applications.](https://mux.com/real-time-video)
operationId: create-space
parameters: []
requestBody:
  content:
    application/json:
      example:
        type: server
      schema:
        $ref: "#/components/schemas/CreateSpaceRequest"
  required: true
responses:
  "201":
    content:
      application/json:
        example:
          data:
            created_at: "1607452572"
            id: uylLl3WuQ54CwqUB9UHySxnN66sqKue5
            status: idle
            type: server
        schema:
          $ref: "#/components/schemas/SpaceResponse"
    description: Space Created
summary: Create a space
tags:
  - Spaces
"/video/v1/spaces/{SPACE_ID}":
delete:
deprecated: true
description: Deletes a space. Spaces can only be deleted when \`idle\`.
operationId: delete-space
parameters:
  - $ref: "#/components/parameters/space_id"
responses:
  "204":
    description: No Content
summary: Delete a space
tags:
  - Spaces
get:
deprecated: true
description: Retrieves the details of a space that has previously been created. Supply the unique space ID that was returned from your create space request, and Mux will return the information about the corresponding space. The same information is returned when creating a space.
operationId: get-space
parameters:
  - $ref: "#/components/parameters/space_id"
responses:
  "200":
    content:
      application/json:
        example:
          data:
            created_at: "1607452572"
            id: uylLl3WuQ54CwqUB9UHySxnN66sqKue5
            status: idle
            type: server
        schema:
          $ref: "#/components/schemas/SpaceResponse"
    description: OK
summary: Retrieve a space
tags:
  - Spaces
"/video/v1/spaces/{SPACE_ID}/broadcasts":
post:
deprecated: true
description: |-
  Creates a new broadcast. Broadcasts are used to create composited versions of your space, which can be broadcast to live streams.
  **Note:** By default only a single broadcast destination can be specified. Contact Mux support if you need more.
operationId: create-space-broadcast
parameters:
  - $ref: "#/components/parameters/space_id"
requestBody:
  content:
    application/json:
      example:
        live_stream_id: GQ9025mPqzyjOy3kKQW006qKTqmULW9vFO
      schema:`;
const suffix = `      responses:
"201":
  content:
    application/json:
      example:
        data:
          id: uylLl3WuQ54CwqUB9UHySxnN66sqKue5
          layout: gallery
          live_stream_id: GQ9025mPqzyjOy3kKQW006qKTqmULW9vFO
          resolution: 1920x1080
          status: idle
      schema:
        $ref: "#/components/schemas/BroadcastResponse"
  description: Broadcast Created
summary: Create a space broadcast
tags:
- Spaces
"/video/v1/spaces/{SPACE_ID}/broadcasts/{BROADCAST_ID}":
delete:
deprecated: true
description: Deletes a single broadcast of a specific space. Broadcasts can only be deleted when \`idle\`.
operationId: delete-space-broadcast
parameters:
- $ref: "#/components/parameters/space_id"
- $ref: "#/components/parameters/broadcast_id"
responses:
"204":
  description: No Content
summary: Delete a space broadcast
tags:
- Spaces
get:
deprecated: true
description: Retrieves the details of a broadcast of a specific space.
operationId: get-space-broadcast
parameters:
- $ref: "#/components/parameters/space_id"
- $ref: "#/components/parameters/broadcast_id"
responses:
"200":
  content:
    application/json:
      example:
        data:
          id: uylLl3WuQ54CwqUB9UHySxnN66sqKue5
          layout: gallery
          live_stream_id: GQ9025mPqzyjOy3kKQW006qKTqmULW9vFO
          resolution: 1920x1080
          status: idle
      schema:
        $ref: "#/components/schemas/BroadcastResponse"
  description: OK
summary: Retrieve space broadcast
tags:
- Spaces
"/video/v1/spaces/{SPACE_ID}/broadcasts/{BROADCAST_ID}/start":
post:
deprecated: true
description: Starts broadcasting a space to the associated destination. Broadcasts can only be started when the space is \`active\` (when there are participants connected).
operationId: start-space-broadcast
parameters:
- $ref: "#/components/parameters/space_id"
- $ref: "#/components/parameters/broadcast_id"
responses:
"200":
  content:
    application/json:
      example:
        data: {}
      schema:
        $ref: "#/components/schemas/StartSpaceBroadcastResponse"
  description: OK
summary: Start a space broadcast
tags:
- Spaces
"/video/v1/spaces/{SPACE_ID}/broadcasts/{BROADCAST_ID}/stop":
post:
deprecated: true
description: |-
Stops broadcasting a space, causing the destination live stream to become idle. This API also automatically calls \`complete\` on the destination live stream.
Broadcasts are also automatically stopped when a space becomes idle.
operationId: stop-space-broadcast
parameters:
- $ref: "#/components/parameters/space_id"
- $ref: "#/components/parameters/broadcast_id"
responses:
"200":
  content:
    application/json:
      example:
        data: {}
      schema:
        $ref: "#/components/schemas/StopSpaceBroadcastResponse"
  description: OK
summary: Stop a space broadcast
tags:
- Spaces`;

const inputs = `<PRE> ${prefix} <SUF>${suffix} <MID>`;

const { generated_text: generatedText } = await hf.textGeneration({
  model: "codellama/CodeLlama-7b-hf",
  inputs,
  parameters: {
    max_new_tokens: 250,
  },
});

if (!generatedText.endsWith(" <EOT>")) {
  console.error(generatedText.slice(generatedText.indexOf("<MID>") + 5));
  throw new Error("End not reached");
}

const infilledPart = generatedText.slice(
  generatedText.indexOf("<MID>") + 5,
  -6
);

console.log(infilledPart);

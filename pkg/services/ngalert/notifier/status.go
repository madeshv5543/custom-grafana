package notifier

import (
	"encoding/json"

	apimodels "github.com/grafana/grafana/pkg/services/ngalert/api/tooling/definitions"
)

// TODO: We no longer do apimodels at this layer, move it to the API.
func (am *alertmanager) GetStatus() apimodels.GettableStatus {
	config := &apimodels.PostableUserConfig{}
	status := am.Base.GetStatus() // TODO: This should return a GettableStatus, for now it returns PostableUserConfig.
	if status == nil {
		return *apimodels.NewGettableStatus(&config.AlertmanagerConfig)
	}

	if err := json.Unmarshal(status, config); err != nil {
		am.logger.Error("Unable to unmarshall alertmanager config", "Err", err)
	}

	return *apimodels.NewGettableStatus(&config.AlertmanagerConfig)
}

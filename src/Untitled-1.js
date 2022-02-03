
        <Accordion.Collapse eventKey="0">
        <form id="dosham-check">
          <div className="check-div">
            <input
              type="checkbox"
              onChange={(event) => setTitle(event.target.value)}
              id="check-1"
              className="check-1"
              name="vehicle1"
              value="Don't Know"
            />
            <label for="check-1" className="check-label">
              {" "}
              Don't Know
            </label>
            <br />
          </div>
          <div className="check-div">
            <input
              type="checkbox"
              onChange={(event) => setTitle(...event.target.value)}
              id="check-2"
              className="check-1"
              name="vehicle1"
              value="No"
            />
            <label for="check-2" className="check-label">
              {" "}
              No
            </label>
            <br />
          </div>
          <div className="check-div">
            <input
              type="checkbox"
              id="check-3"
              className="check-1"
              name="vehicle1"
              value="Chevvai"
            />
            <label for="check-3" className="check-label">
              {" "}
              Chevvai
            </label>
            <br />
          </div>
          <div className="check-div">
            <input
              type="checkbox"
              id="check-4"
              className="check-1"
              name="vehicle1"
              value="Rahu & Kethu"
            <label for="check-4" className="check-label">
              {" "}
              Rahu & Kethu
            </label>
            <br />
          </div>
          <div className="check-div">
            <input
              type="checkbox"
              id="check-5"
              className="check-1"
              name="vehicle1"
              value="Parikara Chevvai"
            />
            <label for="check-5" className="check-label">
              {" "}
              Parikara Chevvai
            </label>
            <br />
          </div>
        
        </form>
      </Accordion.Collapse>
    </Accordion>
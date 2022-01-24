const tableColumn = (name: string, value: string) => {
    return (
      <div className={styles.columnBox}>
        <div>{name}</div>
        <div>{value}</div>
      </div>
    );
  };
  const renderScoreTable = () => {
    const {
      hasClassRank,
      partScores = [],
      classRankList = [],
      totalScore,
      totalRank,
    } = scoreInfo;

    const columnsNum =
      (hasClassRank ? classRankList.length : 0) + partScores.length + 2;
    const colSpan = Math.floor(24 / columnsNum);

    return (
      <Row>
        {partScores?.map((item: PartScore) => {
          return (
            <Col span={colSpan}>{tableColumn(item.partName, item.score)}</Col>
          );
        })}
        <Col span={colSpan}>{tableColumn("总分", totalScore)}</Col>
        {hasClassRank &&
          classRankList?.map((item: ClassRank) => {
            return (
              <Col span={colSpan}>{tableColumn(item.clsName, item.rank)}</Col>
            );
          })}
        <Col span={colSpan}>{tableColumn("总排名", totalRank)}</Col>
      </Row>
    );
  };